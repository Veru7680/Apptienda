import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductoListPage } from './producto-list.page';

@NgModule({
  declarations: [ProductoListPage],  // Declara el componente
  imports: [
    CommonModule,
    IonicModule      // Para componentes de Ionic
  ],
  exports: [ProductoListPage]  // Para poder usarlo en otros módulos
})
export class ProductoListPageModule {}