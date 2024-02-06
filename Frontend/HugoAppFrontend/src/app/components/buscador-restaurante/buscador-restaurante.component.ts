import { Component } from '@angular/core';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-buscador-restaurante',
  templateUrl: './buscador-restaurante.component.html',
  styleUrl: './buscador-restaurante.component.css'
})
export class BuscadorRestauranteComponent {
  tipoCocina = '';
  restaurantes: any[] = [];

  constructor(private restauranteService: RestauranteService) { }

  // En tu método de búsqueda dentro del componente
buscarRestaurantesPorTipo(): void {
  this.restauranteService.buscarRestaurantesPorTipoCocina(this.tipoCocina).subscribe(
    data => {
      this.restaurantes = data;
    },
    error => {
      console.error(error);
    }
  );
}

  verMenu(id: number): void {
    // Implementa la lógica para mostrar el menú del restaurante seleccionado
    // Esto podría ser una redirección o abrir un modal, dependiendo de tu diseño
  }
}
