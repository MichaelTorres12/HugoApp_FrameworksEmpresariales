// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Debe ser un arreglo
})
export class LoginComponent {
  email = '';
  password = '';

  // Inyecta Router y AuthService en el constructor
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        
        // Usa Router para navegar al componente buscador de restaurantes
        this.router.navigate(['/buscador-restaurante']); // Asegúrate de que la ruta esté definida en tus rutas
      },
      error => {
        console.error(error);
        console.log("Ha ocurrido un error");
      }
    );
  }
}
