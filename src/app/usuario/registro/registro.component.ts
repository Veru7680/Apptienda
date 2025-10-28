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
  IonToast,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
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
    IonToast,
  ],
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  toastMessage = '';
  showToast = false;

  constructor(private userService: UserService, private router: Router) {}

  async register() {
    console.log('Registrando usuario:', this.nombre, this.email, this.password);

    if (!this.nombre || !this.email || !this.password) {
      this.toastMessage = 'Por favor, completa todos los campos';
      this.showToast = true;
      return;
    }

    try {
      const res = await this.userService.register(this.nombre, this.email, this.password);
      console.log('Respuesta del servidor:', res);

      this.toastMessage = res.message || 'Operación completada';
      this.showToast = true;

      if (res.status === 'success') {
        // Redirigir a login después de 2 segundos
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    } catch (error) {
      console.error('Error de fetch:', error);
      this.toastMessage = 'Error de conexión';
      this.showToast = true;
    }
  }
}
