import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  // Inyeccion de dependencia
  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    if (!this.authService.login(this.email, this.password)) {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
    this.router.navigate(['/listaEmpleados']);
  }


  // Funcion para cambiar el tema de dark a light
  cambiarTema(event: any) {
    const htmlElement = document.getElementById('htmlElement'); 
    if (htmlElement) {
      const nuevoTema = event.target.checked ? 'light' : 'dark';
      htmlElement.setAttribute('data-bs-theme', nuevoTema);
    }
  }

}
