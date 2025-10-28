import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  IonToast
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonInputPasswordToggle,
    FormsModule,
    IonToast
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  toastMessage = '';
  showToast = false;

  constructor(private userService: UserService, private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      this.toastMessage = 'Por favor, completa todos los campos';
      this.showToast = true;
      return;
    }

    try {
      const res = await this.userService.login(this.email, this.password);

      if (res.status === 'success') {
        this.toastMessage = '¡Bienvenido!';
        this.showToast = true;

        // Redirige al menú principal (MenuComponent → HomePage)
        setTimeout(() => this.router.navigate(['/app/home']), 500);
      } else {
        this.toastMessage = res.message || 'Email o contraseña incorrectos';
        this.showToast = true;
      }
    } catch (error) {
      console.error('Error de fetch:', error);
      this.toastMessage = 'Error de conexión';
      this.showToast = true;
    }
  }

  // Redirige al registro
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
