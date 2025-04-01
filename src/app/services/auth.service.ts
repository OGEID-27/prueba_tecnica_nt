import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private autenticado = false;

  login(email: string, password: string): boolean {
    // Credenciales ficticias
    if (email === 'user@example.com' && password === '123456') {
      this.autenticado = true;
      localStorage.setItem('auth', 'true'); // Guardar estado en localStorage
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true'; // Comprobar autenticación
  }

  logout(): void {
    this.autenticado = false;
    localStorage.removeItem('auth'); // Eliminar autenticación
  }
}
