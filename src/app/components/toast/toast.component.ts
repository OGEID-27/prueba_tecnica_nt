import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  // Obtener los toast del servicio
  toasts$ = this._toastService.toasts$;
  
  //Inyeccion de dependincia
  constructor(private _toastService: ToastService){}

  cerrarToast(mensaje: string){
    this._toastService.eliminarToast(mensaje);
  }

}
