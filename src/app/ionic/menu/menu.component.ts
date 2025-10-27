import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Importa todos los componentes de Ionic
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    CommonModule,
    IonicModule, // ✅ Esto reemplaza a todos los IonXXX individuales
    RouterModule
  ],
})
export class MenuComponent {}
