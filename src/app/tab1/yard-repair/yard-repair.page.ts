import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButton,
  IonText,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';

interface RailcarSelection {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-yard-repair',
  templateUrl: './yard-repair.page.html',
  styleUrls: ['./yard-repair.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonButton,
    IonText,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class YardRepairPage implements OnInit {
  railcars: RailcarSelection[] = [];

  repairForm = this.fb.group({
    repairDate: [this.getTodayISO(), Validators.required],
    appliedJobCode: ['', Validators.required],
    narrative: [''],
    removedJobCode: [''],
    conditionCode: ['', Validators.required],
    whyMadeCode: ['', Validators.required],
    location: [''],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  conditionOptions = [
    { label: 'Excellent', value: 'excellent' },
    { label: 'Good', value: 'good' },
    { label: 'Fair', value: 'fair' },
    { label: 'Poor', value: 'poor' },
  ];

  whyMadeOptions = [
    { label: 'Inspection', value: 'inspection' },
    { label: 'Repair', value: 'repair' },
    { label: 'Upgrade', value: 'upgrade' },
    { label: 'Other', value: 'other' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    addIcons({
      'calendar-outline': calendarOutline,
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const selectedCars = navigation?.extras?.state?.['selectedCars'] as
      | string[]
      | undefined;

    if (!selectedCars || selectedCars.length === 0) {
      this.router.navigate(['/tabs/tab1/results']);
      return;
    }

    this.railcars = selectedCars.map((name) => ({
      name,
      selected: true,
    }));
  }

  getTodayISO(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleRailcarSelection(railcar: RailcarSelection) {
    railcar.selected = !railcar.selected;
  }

  incrementQuantity() {
    const current = Number(this.repairForm.controls.quantity.value ?? 0);
    this.repairForm.controls.quantity.setValue(current + 1);
  }

  decrementQuantity() {
    const current = Number(this.repairForm.controls.quantity.value ?? 0);
    if (current <= 0) {
      return;
    }
    this.repairForm.controls.quantity.setValue(current - 1);
  }

  handleQuantityInput(event: CustomEvent) {
    const rawValue = event.detail?.value ?? '';
    const parsedValue = Number(rawValue);
    if (Number.isNaN(parsedValue) || parsedValue < 0) {
      this.repairForm.controls.quantity.setValue(0);
      return;
    }
    this.repairForm.controls.quantity.setValue(parsedValue);
  }

  get selectedRailcars(): RailcarSelection[] {
    return this.railcars.filter((railcar) => railcar.selected);
  }

  get canSubmit(): boolean {
    return this.selectedRailcars.length > 0 && this.repairForm.valid;
  }

  async submitWorkOrder() {
    if (!this.canSubmit) {
      return;
    }

    const toast = await this.toastController.create({
      message: 'Work Order Added!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
    this.router.navigate(['/tabs/tab1/results']);
  }

  trackByRailcar(_: number, railcar: RailcarSelection) {
    return railcar.name;
  }
}
