import { Component, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonSpinner,
  IonIcon,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ViewWillEnter } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonSpinner,
    IonIcon,
    FormsModule,
    CommonModule,
  ],
})
export class Tab1Page implements ViewWillEnter, OnDestroy {
  railcarInputs: string[] = [''];
  isLoading = false;
  private previousUrl: string = '';
  private ocrWorker: any = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ camera });
    this.initializeOCR();

    // Track navigation to detect when coming back from results page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        // Only reset if we're coming back from results page (not from other tabs)
        if (
          this.previousUrl.includes('/tabs/tab1/results') &&
          currentUrl === '/tabs/tab1'
        ) {
          this.railcarInputs = [''];
          this.isLoading = false;
        }
        this.previousUrl = currentUrl;
      });
  }

  ionViewWillEnter() {
    // Only reset if we're coming from results page
    const currentUrl = this.router.url;
    if (
      this.previousUrl.includes('/tabs/tab1/results') &&
      currentUrl === '/tabs/tab1'
    ) {
      this.railcarInputs = [''];
      this.isLoading = false;
    }
  }

  addRailcarInput() {
    this.railcarInputs.push('');
  }

  removeRailcarInput(index: number) {
    if (this.railcarInputs.length > 1) {
      this.railcarInputs.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  async onSearch() {
    this.isLoading = true;
    // Navigate to results page after a brief delay
    setTimeout(() => {
      this.router.navigate(['/tabs/tab1/results']);
      this.isLoading = false;
    }, 300);
  }

  async initializeOCR() {
    try {
      this.ocrWorker = await createWorker('eng');
    } catch (error) {
      console.error('Failed to initialize OCR worker:', error);
    }
  }

  async openCamera(index: number) {
    // Check if OCR worker is initialized
    if (!this.ocrWorker) {
      await this.initializeOCR();
      if (!this.ocrWorker) {
        const errorToast = await this.toastController.create({
          message: 'Failed to initialize OCR',
          duration: 3000,
          position: 'bottom',
          color: 'danger',
        });
        await errorToast.present();
        return;
      }
    }

    try {
      // Open photo library directly
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image?.dataUrl) {
        const loading = await this.loadingController.create({
          message: 'Reading code...',
          spinner: 'crescent',
        });
        await loading.present();

        try {
          // Perform OCR on the captured image
          const {
            data: { text },
          } = await this.ocrWorker.recognize(image.dataUrl);

          // Clean up the text - remove whitespace and extract alphanumeric codes
          const cleanedText = text.replace(/\s+/g, '').trim().toUpperCase();

          // Try to extract a railcar code (typically alphanumeric, 8-12 characters)
          // Look for patterns like ADMX15700, etc.
          const railcarPattern = /[A-Z]{2,4}\d{4,8}/;
          const match = cleanedText.match(railcarPattern);

          if (match) {
            this.railcarInputs[index] = match[0];
          } else if (cleanedText.length > 0) {
            // If no pattern match, use the cleaned text (up to 20 chars)
            this.railcarInputs[index] = cleanedText.substring(0, 20);
          }
        } catch (ocrError) {
          console.error('OCR error:', ocrError);
          const errorToast = await this.toastController.create({
            message: 'Failed to read code from image',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          await errorToast.present();
        } finally {
          await loading.dismiss();
        }
      }
    } catch (error: any) {
      // Only show error if user didn't cancel
      if (!error.message || !error.message.includes('User cancelled')) {
        console.error('Camera/Photos error:', error);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);

        let errorMessage = 'Failed to access photos';
        if (error.message) {
          if (
            error.message.includes('permission') ||
            error.code === 'PERMISSION_DENIED'
          ) {
            errorMessage =
              'Photo library permission denied. Please enable in Settings.';
          } else {
            errorMessage = error.message;
          }
        }

        const errorToast = await this.toastController.create({
          message: errorMessage,
          duration: 4000,
          position: 'bottom',
          color: 'danger',
        });
        await errorToast.present();
      }
    }
  }

  async ngOnDestroy() {
    if (this.ocrWorker) {
      await this.ocrWorker.terminate();
    }
  }
}
