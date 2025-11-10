import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
    id: number;
  nombre: string;
  descripcion: string; // <- esto estaba faltando
  created_at: string;   // <- esto también
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = 'http://localhost/apptienda/apptienda_API/controllers/mostrarCategoria.php';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl); // <-- cambiar apiUrl por baseUrl
  }
}
