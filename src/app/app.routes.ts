import { Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AgregarEditarEmpleadosComponent } from './components/agregar-editar-empleados/agregar-editar-empleados.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth.guard'; // rutas especificas 

export const routes: Routes = [
    // Lista de empleados
    {path: 'listaEmpleados', component: EmpleadosComponent, canActivate: [authGuard]},

    // Agregar
    {path: 'agregarEmpleado', component: AgregarEditarEmpleadosComponent, canActivate: [authGuard]},

    // Editar
    {path: 'editarEmpleado/:id', component: AgregarEditarEmpleadosComponent, canActivate: [authGuard]},

    // Login
    {path: 'login', component: LoginComponent},

    // Pagina principal
    {path: '', redirectTo: 'login', pathMatch: 'full'}

];
