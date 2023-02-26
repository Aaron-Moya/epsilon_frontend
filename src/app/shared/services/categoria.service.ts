import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  // Esta URL obtiene el listado de todas las categorias en el backend
  private baseURL = "http://localhost:8080/api/categorias";

  constructor(private httpClient: HttpClient) { }

  obtenerCategoriaPorId(id: number): Observable<Categorias> {
    return this.httpClient.get<Categorias>(`${this.baseURL + "/" + id}`);
  }

  obtenerCategorias(): Observable<Categorias[]> {
    return this.httpClient.get<Categorias[]>(`${this.baseURL}`);
  }

}
