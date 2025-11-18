import { Routes } from '@angular/router';
import { RegistroProducto } from './pages/registro-producto/registro-producto';
import { Inicio } from './pages/inicio/inicio';
import { Listado } from './pages/listado/listado';

export const routes: Routes = 
[
    { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    { path: 'inicio', component: Inicio},
    { path: 'producto/registrar', component: RegistroProducto},
    { path: 'listado', component: Listado}
];
