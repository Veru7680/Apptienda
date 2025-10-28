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
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

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
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    console.log('Intentando iniciar sesión con:', this.email, this.password);
    // Más adelante puedes agregar validación y redirección a "home"
  }

  // 🔹 Ir al registro
  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
