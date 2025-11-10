import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ AGREGAR FormsModule

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner, 
  IonButton,
  IonIcon,
  IonCard, // ✅ AGREGAR
  IonCardHeader, // ✅ AGREGAR
  IonCardTitle, // ✅ AGREGAR
  IonCardContent, // ✅ AGREGAR
  IonInput, // ✅ AGREGAR
  IonTextarea // ✅ AGREGAR
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
    FormsModule, // ✅ AGREGAR
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner, 
    IonButton,
    IonIcon,
    IonCard, // ✅ AGREGAR
    IonCardHeader, // ✅ AGREGAR
    IonCardTitle, // ✅ AGREGAR
    IonCardContent, // ✅ AGREGAR
    IonInput, // ✅ AGREGAR
    IonTextarea // ✅ AGREGAR
  ]
})
export class CategoriaListPage implements OnInit {
  categorias: Categoria[] = [];
  cargando = true;
  errorMsg: string | null = null;
  nuevaCategoria = { nombre: '', descripcion: '' }; // ✅ AGREGAR

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.cargando = true;
    this.errorMsg = null;

    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar categorías:', err);
        this.errorMsg = 'No se pudieron cargar las categorías';
        this.cargando = false;
      }
    });
  }

  // ✅ AGREGAR MÉTODO PARA REGISTRAR CATEGORÍA
  registrarCategoria() {
  if (!this.nuevaCategoria.nombre.trim()) {
    this.errorMsg = 'El nombre de la categoría es requerido';
    return;
  }

  console.log('Enviando datos:', this.nuevaCategoria);
  
  this.categoriaService.registrarCategoria(this.nuevaCategoria).subscribe({
    next: (response: any) => {
      console.log('✅ Respuesta del servidor:', response);
      
      if (response.status === 'success') {
        alert('✅ ' + response.message);
        this.nuevaCategoria = { nombre: '', descripcion: '' };
        this.errorMsg = null;
        this.cargarCategorias();
      } else {
        this.errorMsg = 'Error: ' + response.message;
      }
    },
    error: (err: any) => {
      console.error('❌ Error completo:', err);
      console.error('❌ Status:', err.status);
      console.error('❌ Mensaje:', err.message);
      this.errorMsg = `Error ${err.status}: ${err.message}`;
    }
  });
}
}