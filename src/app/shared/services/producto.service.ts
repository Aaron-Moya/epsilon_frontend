import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  // Esta URL obtiene el listado de todas las categorias en el backend
  private baseURL = "http://localhost:8080/api/productos";

  constructor(private httpClient: HttpClient) { }

  crearAnuncio(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, formData);
  };

}
