import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonCheckbox, IonButton, IonIcon, IonSpinner, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { warning, chevronDown } from 'ionicons/icons';

interface EquipmentHealthItem {
  carName: string;
  severity: string;
  description: string;
}

@Component({
  selector: 'app-results',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonCheckbox,
    IonButton,
    IonIcon,
    IonSpinner,
    IonBackButton,
    IonButtons,
    CommonModule
  ],
})
export class ResultsPage implements OnInit {
  equipmentData: EquipmentHealthItem[] = [];
  loading = true;
  selectedItems: Set<string> = new Set();

  constructor(private http: HttpClient) {
    addIcons({ warning, chevronDown });
  }

  ngOnInit() {
    this.loadEquipmentData();
  }

  loadEquipmentData() {
    // Simulate loading delay
    setTimeout(() => {
      this.http.get<EquipmentHealthItem[]>('assets/example_data.json').subscribe({
        next: (data) => {
          this.equipmentData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading equipment data:', error);
          this.loading = false;
        }
      });
    }, 1500); // 1.5 second delay to show loading state
  }

  toggleSelection(carName: string) {
    if (this.selectedItems.has(carName)) {
      this.selectedItems.delete(carName);
    } else {
      this.selectedItems.add(carName);
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'medium';
      default:
        return 'medium';
    }
  }
}

