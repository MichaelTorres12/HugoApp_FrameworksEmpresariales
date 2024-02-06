// src/app/services/restaurante.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private baseUrl = 'http://localhost:3000/api/restaurantes'; // Asegúrate de que esta sea la URL correcta para tu backend

  constructor(private http: HttpClient) { }

  buscarRestaurantesPorTipoCocina(tipoCocina: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscar?tipoCocina=${tipoCocina}`);
}
}
