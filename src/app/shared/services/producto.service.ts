import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  // Esta URL obtiene el listado de todas las categorias en el backend
  private baseURL = "http://localhost:8080/api/productos";

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(page: number, size: number): any {
    return this.httpClient.get<Page<Productos>>(`${this.baseURL + "?page=" + page + "&size=" + size}`);
  };

  crearAnuncio(formData: FormData): Observable<Object> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(`${this.baseURL}`, formData, { headers });
  };

}
