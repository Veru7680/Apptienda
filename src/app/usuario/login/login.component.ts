import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonInputPasswordToggle, // ✅ <-- agrega esto
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
    IonInputPasswordToggle, // ✅ <-- y también aquí
    FormsModule,
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  login() {
    console.log('Intentando iniciar sesión con:', this.email, this.password);
  }
}
