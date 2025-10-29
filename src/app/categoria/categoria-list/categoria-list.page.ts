import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

import { CategoriaService, Categoria } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  templateUrl: './categoria-list.page.html',
  styleUrls: ['./categoria-list.page.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class CategoriaListPage implements OnInit {
  categorias: Categoria[] = [];
  cargando = true;
  errorMsg: string | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
  this.cargando = true;
  this.errorMsg = null;

  this.categoriaService.getCategorias().subscribe({
    next: (data: Categoria[]) => {  // <-- declarar tipo
      this.categorias = data;
      this.cargando = false;
    },
    error: (err: any) => {  // <-- declarar tipo
      console.error('Error al cargar categorías:', err);
      this.errorMsg = 'No se pudieron cargar las categorías';
      this.cargando = false;
    }
  });
}

}
