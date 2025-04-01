import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormGroup, FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpleadosService} from '../../services/empleados.service';
import { NgClass } from '@angular/common';
import { from } from 'rxjs';
import { ToastService } from '../../services/toast.service';



@Component({
  selector: 'app-agregar-editar-empleados',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './agregar-editar-empleados.component.html',
  styleUrl: './agregar-editar-empleados.component.css'
})
export class AgregarEditarEmpleadosComponent implements OnInit{
  formularioEmpleado!: FormGroup;
  valorFormulario: object = {};
  jobs: any[] = [];
  claseBoton: String = '';
  idCell: number;
  titulo: String = '';
  titulo2: String = '';
  boton: String = '';
  

  // Inyeccion de dependencia
  constructor(private fb: FormBuilder, private _puestosServices: EmpleadosService, private aRoute: ActivatedRoute, private router: Router, private _serviceToast: ToastService){
    this.formularioEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      salario: ['', Validators.required],
      edad: [''] // No es obligatorio
    })

    // Deducimos si el usuario esta editando o agregando mediante el id de la ruta
    this.idCell = Number(this.aRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(){
    this._puestosServices.getJobs().subscribe((data) => {
      this.jobs = data;
      //console.log(data)
    })

    if(this.idCell > 0){ // Editar
      //Rellenar formulario
      const empleado = this._puestosServices.obtenerEmpleadoPorId(this.idCell);
      if(empleado){
        // Llena el formulario
        this.formularioEmpleado.patchValue(empleado);
      }

      // Titulos
      this.titulo = 'Editar'
      this.titulo2 = 'Editado'
      this.boton = 'Guardar'
      this.claseBoton = 'btn-info'
      
    } else { // Agregar
      this.titulo = 'Agregar'
      this.titulo2 = 'Agregado'
      this.boton = 'Agregar'
      this.claseBoton = 'btn-success'
    }


  }


  agregarEditar(){
    if(this.formularioEmpleado?.valid){
      const form = this.formularioEmpleado.value

      const formularioEmpleado = {
        nombre: form.nombre,
        puesto: form.puesto,
        fechaIngreso: form.fechaIngreso,
        salario: String(form.salario),
        edad: form.edad
      }

      if (this.idCell > 0 ){ // Editar
        // Servicio para editar
        this._puestosServices.updateEmpleado(formularioEmpleado, this.idCell);
        console.log(`Editado Correctamente ${formularioEmpleado}`)
        console.log(this.idCell)
        // Redirigir a la lista de empleados
        this.router.navigate(['/listaEmpleados']);
        //Alerta
        this._serviceToast.mostrarToast('Empleado guardado con exito', 'info')
      } else { // Agregar
        // Llamamos al servicio de agregar
        this._puestosServices.agregarEmpleado(formularioEmpleado);
        console.log(`Agregado Correctemente ${formularioEmpleado}`)
        //Alerta
        this._serviceToast.mostrarToast('Empleado agregado con exito', 'success')
        // Redirigir a la lista de empleados
        this.router.navigate(['/listaEmpleados']);
      }

      
    } else {
      console.log('NO ES VALIDO');
      this.formularioEmpleado.markAllAsTouched();
      this._serviceToast.mostrarToast('Datos Invalidos', 'danger')
    }
  }


  }