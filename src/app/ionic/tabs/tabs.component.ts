import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  IonButton // ✅ AGREGAR IonButton PARA EL BOTÓN
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  cubeOutline,
  cloudUploadOutline,
  listOutline,
  searchOutline,
  add,
  refreshOutline // ✅ AGREGAR EL ICONO DE ACTUALIZAR
} from 'ionicons/icons';
import { CategoriaListPage } from '../../categoria/categoria-list/categoria-list.page';
import { ProductoListPage } from '../../producto/producto-list/producto-list.page';
import { ProductoRegisterPage } from '../../producto/producto-register/producto-register.page';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonIcon,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
    IonButton, // ✅ AGREGAR
    CategoriaListPage,
    ProductoListPage,
    ProductoRegisterPage
  ],
})
export class TabsComponent {
  constructor() {
    addIcons({
      cubeOutline,
      cloudUploadOutline,
      listOutline,
      searchOutline,
      add,
      refreshOutline // ✅ AGREGAR
    });
  }

  // ✅ MÉTODO PARA ACTUALIZAR PRODUCTOS
  actualizarProductos() {
    console.log('Actualizando productos...');
    
    // Opción 1: Usar el método global
    if (typeof (window as any)['recargarProductos'] === 'function') {
      (window as any)['recargarProductos']();
    }
    
    // Opción 2: Disparar evento (también funciona)
    window.dispatchEvent(new Event('productosActualizados'));
  }
}