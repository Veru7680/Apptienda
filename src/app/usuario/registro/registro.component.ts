import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonInputPasswordToggle, // ✅ agrega esta línea
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

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
    IonInputPasswordToggle, // ✅ también aquí
    FormsModule,
  ],
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';

  register() {
    console.log('Registrando usuario:', this.nombre, this.email, this.password);
  }
}
