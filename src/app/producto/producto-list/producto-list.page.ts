import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ProductoListPage implements OnInit {
  productos: Producto[] = [];
  cargando: boolean = true;
  error: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
    
    // ✅ ESCUCHAR EVENTO DE ACTUALIZACIÓN
    window.addEventListener('productosActualizados', () => {
      console.log('Evento recibido: actualizando productos...');
      this.cargarProductos();
    });
  }

  ionViewWillEnter() {
    this.cargarProductos();
  }

  // ✅ MÉTODO GLOBAL PARA QUE EL BOTÓN LO LLAME
  ngAfterViewInit() {
    (window as any)['recargarProductos'] = () => {
      console.log('Método global llamado: actualizando productos...');
      this.cargarProductos();
    };
  }

  cargarProductos() {
    this.cargando = true;
    this.error = '';

    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        console.log('Productos cargados:', this.productos.length);
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.cargando = false;
        console.error('Error:', error);
      }
    });
  }

  recargar(event?: any) {
    this.cargarProductos();
    if (event) {
      event.target.complete();
    }
  }
}