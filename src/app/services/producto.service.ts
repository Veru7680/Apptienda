import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: number;
  created_at: string;
  // Opcional: si quieres incluir el nombre de la categoría
  categoria_nombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost/apptienda/apptienda_API/controllers';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/mostrarProducto.php`);
  }

  // Obtener producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/mostrarProducto.php?id=${id}`);
  }

  // ✅ AGREGAR MÉTODO PARA CREAR PRODUCTO
  crearProducto(productoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crearProducto.php`, productoData);
  }

  // Actualizar producto
  actualizarProducto(id: number, producto: Partial<Producto>): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarProducto.php?id=${id}`, producto);
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminarProducto.php?id=${id}`);
  }

  // Obtener productos por categoría
  getProductosPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/mostrarProducto.php?categoria_id=${categoriaId}`);
  }
}