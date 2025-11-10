import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonLabel ,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-categoria-register',
  templateUrl: './categoria-register.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonLabel,
    IonIcon
  ]
})
export class CategoriaRegisterPage {
  categoria = { nombre: '', descripcion: '' };

  registrarCategoria() {
    console.log('Registrando:', this.categoria);
    this.categoria = { nombre: '', descripcion: '' };
  }
}