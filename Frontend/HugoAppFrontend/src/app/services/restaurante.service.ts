// src/app/services/restaurante.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private baseUrl = 'http://localhost:3000/api/restaurantes';

  constructor(private http: HttpClient) { }

  //Usar la barra de busqueda para filtrar restaurantes por tipo de comida, eje: Mexa, rapida, etc.
  buscarRestaurantesPorTipoCocina(tipoCocina: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/buscar?tipoCocina=${tipoCocina}`);
}

  //Darle click a un restaurante y por medio del ID obtener los detalles de este en especifico
  obtenerDetallesRestaurante(restauranteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${restauranteId}`);
}

  //Obtener el menu del restaurante en especifico que he seleccionado
  obtenerMenuRestaurante(restauranteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${restauranteId}/menu`);
  }

}
