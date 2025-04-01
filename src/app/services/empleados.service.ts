import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empleados } from '../interface/empleados';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  // Datos ficticios
  private empleados: Empleados[] = [
    { id: 1, nombre: "Juan Pérez", puesto: "Developer", fechaIngreso: "2023-06-15", salario: "30000", edad: 23 },
    { id: 2, nombre: "Ana López", puesto: "Manager", fechaIngreso: "2022-04-10", salario: "45000", edad: 43 },
    { id: 3, nombre: "Carlos Sánchez", puesto: "Planner", fechaIngreso: "2021-12-05", salario: "32500", edad: 24 },
    { id: 4, nombre: "María Gómez", puesto: "Consultant", fechaIngreso: "2023-08-22", salario: "40000", edad: 34 },
    { id: 5, nombre: "José Ramírez", puesto: "Executive", fechaIngreso: "2020-09-30", salario: "50000", edad: 23 },
    { id: 6, nombre: "Laura Fernández", puesto: "Strategist", fechaIngreso: "2022-11-14", salario: "38000", edad: 36 },
    { id: 7, nombre: "Pedro Domínguez", puesto: "Officer", fechaIngreso: "2021-07-20", salario: "28000", edad: 27 }
  ];

  private empleadosSujeto = new BehaviorSubject<Empleados[]>(this.empleados);
  empleados$ = this.empleadosSujeto.asObservable();

  // Consumimos la API de los empleos para agregarlos en puestos en el formulario
  private apiUrl = 'https://67d0ea93825945773eb24739.mockapi.io/api/v1/getAllJobs';

  constructor(private http: HttpClient) {}

  // Obtener todos los puestos
  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar Empleados
  agregarEmpleado(nuevoEmpleado: Empleados) {
    // Asignar un nuevo ID automáticamente
    nuevoEmpleado.id = this.empleados.length ? Math.max(...this.empleados.map(e => e.id!)) + 1 : 1;

    // Agregar el nuevo empleado a la lista
    this.empleados.push(nuevoEmpleado);

    // Emitir los cambios
    this.empleadosSujeto.next(this.empleados);
  }

  // Ontener todos los empleados
  obtenerEmpleados() {
    return this.empleados$;
  }

  // Obtener un solo empleado en especifico
  obtenerEmpleadoPorId(id: number){
    return this.empleados.find(empleado => empleado.id === id);
  }

  // Actualizar datos del empleado
  updateEmpleado(empleadoActualizado: Empleados, id: number){
    
    const index = this.empleados.findIndex(empleado => empleado.id === id); // Buscar indice real

    // El id debe ser mayor a 0
    if (index !== -1) {
      this.empleados[index] = { ...empleadoActualizado, id }; // Asegurar que el ID se conserve
      this.empleadosSujeto.next([...this.empleados]); // Emitir nueva lista
    }
  }
}
