import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = []; // Supongamos que esta es la lista de ítems del menú que se mostrarán
  pedidoActualId: number | null = null;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    // Aquí podrías cargar los ítems del menú, por ejemplo
  }

  agregarAlPedido(menuId: number, cantidad: number) {
    const usuarioId = parseInt(localStorage.getItem('usuarioId') || '0');
    // Verificar si ya existe un pedido activo
    if (!this.pedidoActualId) {
      // Crear un nuevo pedido si no existe uno
      this.crearPedido(usuarioId, menuId, cantidad);
    } else {
      // Agregar ítem al pedido existente
      this.agregarItemDetallePedido(this.pedidoActualId, menuId, cantidad);
    }
  }

  crearPedido(usuarioId: number, menuId: number, cantidad: number) {
    const datosPedido = {
      UsuarioID: usuarioId,
      DireccionEntrega: '', // Puede ser configurado más tarde
      MetodoPago: '' // Puede ser configurado más tarde
    };
    this.pedidoService.crearPedido(datosPedido).subscribe({
      next: (response) => {
        this.pedidoActualId = response.PedidoID; // Almacenar el ID del nuevo pedido
        this.agregarItemDetallePedido(response.PedidoID, menuId, cantidad); // Agregar el primer ítem al nuevo pedido
      },
      error: (error) => console.error('Error al crear el pedido', error)
    });
  }

  agregarItemDetallePedido(pedidoId: number, menuId: number, cantidad: number) {
    const datosDetalle = {
      PedidoID: pedidoId,
      MenuID: menuId,
      Cantidad: cantidad
      // El precio se manejará en el backend
    };
    this.pedidoService.agregarItemDetallePedido(datosDetalle).subscribe({
      next: () => console.log('Ítem agregado al pedido exitosamente'),
      error: (error) => console.error('Error al agregar ítem al pedido', error)
    });
  }
}
