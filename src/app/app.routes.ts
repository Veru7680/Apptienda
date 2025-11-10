import { Routes } from '@angular/router';
import { MenuComponent } from './ionic/menu/menu.component';

export const routes: Routes = [
  // 🔹 Rutas públicas (fuera del menú)
  {
    path: 'login',
    loadComponent: () => import('./usuario/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./usuario/registro/registro.component').then(c => c.RegistroComponent)
  },
  

  // 🔹 Rutas dentro del menú (para usuarios logueados)
  {
    path: 'app',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'tabs',
        loadComponent: () => import('./ionic/tabs/tabs.component').then(c => c.TabsComponent)
      },
      {
        path: 'categoria-list',
        loadComponent: () => import('./categoria/categoria-list/categoria-list.page').then(m => m.CategoriaListPage)
      },
      {
        path: 'producto-register', // ✅ AGREGAR COMO RUTA PÚBLICA TEMPORAL
        loadComponent: () => import('./producto/producto-register/producto-register.page').then(m => m.ProductoRegisterPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  // 🔹 Cuando la app inicia, va directo al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔹 Rutas no reconocidas → login
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];