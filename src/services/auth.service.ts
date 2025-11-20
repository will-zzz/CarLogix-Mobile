import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // 🧠 Handles user login
  async login(email: string, password: string): Promise<boolean> {
    // Example logic: replace this with a real API later
    if (email === 'demo@carlogix.com' && password === '1234') {
      // Save user info in localStorage to persist session
      localStorage.setItem('user', JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  // 🚪 Handles logout
  logout(): void {
    localStorage.removeItem('user');
  }

  // 🔍 Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // 📦 Retrieve current user data
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
