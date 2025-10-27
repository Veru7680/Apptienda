import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// ✅ Importa tu TabsComponent
import { TabsComponent } from '../tabs/tabs.component'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TabsComponent  // ✅ Agrega aquí
  ],
})
export class MenuComponent {}
