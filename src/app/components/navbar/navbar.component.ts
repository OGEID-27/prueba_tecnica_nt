import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //Inyeccion
  constructor(private authService: AuthService, private router: Router){}

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
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
