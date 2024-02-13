// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  //Login
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, contrasena });
  }
}
