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

  // En mi método de búsqueda dentro del componente
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
    // La lógica para mostrar el menú del restaurante seleccionado, si quisisese abrirlo aqui o con una ventana modal pero como lo hare redireccionado a otro componente.
  }
}
