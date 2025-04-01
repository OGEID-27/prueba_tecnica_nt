import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Empleados } from '../../interface/empleados';
import { RouterLink } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastService } from '../../services/toast.service';



@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [NavbarComponent, DatePipe, CommonModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  // Lista de empleados con datos dummy 
  listEmpleados: Empleados[] = []

  constructor(private _empleadosService: EmpleadosService, private _toastService: ToastService){}

  //Input para el buscador
  inputFilter: string = ''

  ngOnInit(): void {
    this._empleadosService.obtenerEmpleados().subscribe(data => {
      this.listEmpleados = data;
    })
    
  }

  // Funcion para filtrar empleados
  filtroEmpleados(){
    return this.listEmpleados.filter(empleado => 
      empleado.nombre.toLowerCase().includes(this.inputFilter.toLowerCase()),
    );
  }

  //Actualizar datoss
  update(event: any){
    this.inputFilter = event.target.value;
  }

  // Eliminar el empleado solo de la lista
  eliminarEmpleado(id: number | undefined) {
    this.listEmpleados = this.listEmpleados.filter(lista => lista.id !== id);
    
    console.log('Empleado eliminado, mostrando toast...');
    this._toastService.mostrarToast('Empleado eliminado con éxito', 'warning');
  }

  

}
