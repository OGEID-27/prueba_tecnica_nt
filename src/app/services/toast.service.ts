import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../interface/toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSujeto = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSujeto.asObservable();

  mostrarToast(mensaje: string, tipo: Toast['tipo']) {
    console.log(`Mostrando Toast: ${mensaje} - Tipo: ${tipo}`);
    
    const nuevoToast: Toast = { mensaje, tipo };
    this.toastsSujeto.next([...this.toastsSujeto.getValue(), nuevoToast]);
  
    // Eliminar automáticamente después de 3 segundos
    setTimeout(() => {
      this.eliminarToast(mensaje);
    }, 3000);
  }
  

  eliminarToast(mensaje: string){
    const toastActual = this.toastsSujeto.getValue().filter(t => t.mensaje !== mensaje);
    this.toastsSujeto.next(toastActual);
  }

  constructor() { }
}
