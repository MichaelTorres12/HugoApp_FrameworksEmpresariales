// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  // Inyecto Router y AuthService en el constructor
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        localStorage.setItem('UsuarioID', data.UsuarioID.toString()); //Guarda el ID del usuario en el local Storage hecho string
        
        // Usa Router para navegar al componente buscador de restaurantes
        this.router.navigate(['/buscador-restaurante']);
      },
      error => {
        console.error(error);
        console.log("Ha ocurrido un error");
      }
    );
  }
}
