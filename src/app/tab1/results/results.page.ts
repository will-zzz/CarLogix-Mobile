import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonCheckbox, IonButton, IonIcon, IonSpinner, IonBackButton, IonButtons, IonToggle } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { warning, chevronDown, chevronUp, home } from 'ionicons/icons';

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
    IonToggle,
    CommonModule,
    FormsModule
  ],
})
export class ResultsPage implements OnInit {
  equipmentData: EquipmentHealthItem[] = [];
  loading = true;
  selectedItems: Set<string> = new Set();
  expandedItems: Set<string> = new Set();
  showHighPriorityOnly = false;

  constructor(private http: HttpClient) {
    addIcons({ warning, chevronDown, chevronUp, home });
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

  toggleSelection(carName: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedItems.has(carName)) {
      this.selectedItems.delete(carName);
    } else {
      this.selectedItems.add(carName);
    }
  }

  toggleExpand(carName: string, event?: Event) {
    // Don't expand if clicking on checkbox
    if (event && (event.target as HTMLElement).closest('ion-checkbox')) {
      return;
    }
    if (this.expandedItems.has(carName)) {
      this.expandedItems.delete(carName);
    } else {
      this.expandedItems.add(carName);
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

