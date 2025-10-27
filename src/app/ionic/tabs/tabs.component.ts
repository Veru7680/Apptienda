import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  cubeOutline,
  cloudUploadOutline,
  listOutline,
  searchOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonIcon,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
  ],
})
export class TabsComponent {
  constructor() {
    // Registramos los iconos que vamos a usar en los tab-buttons
    addIcons({
      cubeOutline,       // Producto
      cloudUploadOutline,// Subir Producto
      listOutline,       // Categorías
      searchOutline      // Buscar
    });
  }
}
