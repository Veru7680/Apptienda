import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost/apptienda/apptienda_API/controllers/';
  private authKey = 'usuario_logueado'; // ✅ Clave para guardar sesión

  // 🔹 Registrar usuario
  async register(nombre: string, email: string, password: string) {
    const response = await fetch(this.baseUrl + 'register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });
    return await response.json();
  }

  // 🔹 Iniciar sesión y guardar estado
  async login(email: string, password: string) {
    const response = await fetch(this.baseUrl + 'login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    // ✅ Si el login fue exitoso, guardar sesión
    if (result.status === 'success') {
      localStorage.setItem(this.authKey, 'true');
    }

    return result;
  }

  // 🔹 Verificar si el usuario sigue logueado
  isAuthenticated(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }

  // 🔹 Cerrar sesión
  logout() {
    localStorage.removeItem(this.authKey);
  }
}
