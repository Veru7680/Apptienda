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
        path: 'tabs',
  loadComponent: () => import('./ionic/tabs/tabs.component').then(c => c.TabsComponent)      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

       {
        path: '',
        redirectTo: 'tabs', // Redirige al iniciar la app a la página de Tabs
        pathMatch: 'full'
      }

    ]
  }
];
