import { Component } from '@angular/core';          // Core Angular decorator for creating components
import { Router } from '@angular/router';           // Used for navigation after login
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonLabel
} from '@ionic/angular/standalone';                 // Ionic UI elements used in the HTML
import { FormsModule } from '@angular/forms';       // Enables [(ngModel)] two-way data binding
import { CommonModule } from '@angular/common';     // Enables common Angular directives (like *ngIf)
import { AuthService } from '../services/auth.service'; // Custom service for login logic

@Component({
  selector: 'app-login',                            // HTML tag name for this component
  templateUrl: './login.page.html',                 // Links to the visual layout file
  styleUrls: ['./login.page.scss'],                 // Links to styles
  standalone: true,                                 // New Angular feature: no need for a parent NgModule
  imports: [                                        // Registers all building blocks this component needs
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonLabel,
    FormsModule, CommonModule
  ]
})
export class LoginPage {
  // 🧩 1. Data bound to the input fields in the HTML
  email = '';
  password = '';

  // 🧩 2. Inject dependencies into the component
  constructor(private router: Router, private authService: AuthService) {}

  // 🧩 3. The main logic for when "Login" button is clicked
  async login() {
    const success = await this.authService.login(this.email, this.password);
    if (success) {
      // 🧭 Navigate to the app’s main page after successful login
      this.router.navigate(['/tabs']);
    } else {
      // ⚠️ Show error if credentials are invalid
      alert('Invalid email or password.');
    }
  }
}
