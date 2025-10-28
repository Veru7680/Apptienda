import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost/comercio12_api/controllers/';

  async register(nombre: string, email: string, password: string) {
    const response = await fetch(this.baseUrl + 'register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });
    return await response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(this.baseUrl + 'login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  }
}
