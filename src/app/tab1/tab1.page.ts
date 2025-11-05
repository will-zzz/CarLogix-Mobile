import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonInput, IonItem, IonLabel, IonButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ViewWillEnter } from '@ionic/angular';
import { filter } from 'rxjs/operators';

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
    CommonModule
  ],
})
export class Tab1Page implements ViewWillEnter {
  railcarInputs: string[] = [''];
  isLoading = false;
  private previousUrl: string = '';

  constructor(private router: Router) {
    addIcons({ camera });
    
    // Track navigation to detect when coming back from results page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        // Only reset if we're coming back from results page (not from other tabs)
        if (this.previousUrl.includes('/tabs/tab1/results') && currentUrl === '/tabs/tab1') {
          this.railcarInputs = [''];
          this.isLoading = false;
        }
        this.previousUrl = currentUrl;
      });
  }

  ionViewWillEnter() {
    // Only reset if we're coming from results page
    const currentUrl = this.router.url;
    if (this.previousUrl.includes('/tabs/tab1/results') && currentUrl === '/tabs/tab1') {
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
}
