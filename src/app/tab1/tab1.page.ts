import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonButton,
    IonIcon,
    IonSpinner,
    FormsModule,
    CommonModule
  ],
})
export class Tab1Page {
  railcarInputs: string[] = [''];
  isLoading = false;

  constructor(private router: Router) {}

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
