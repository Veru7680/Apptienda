import { Routes } from '@angular/router';
import { MenuComponent } from './ionic/menu/menu.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,   // Contenedor principal con el menú
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
    
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
