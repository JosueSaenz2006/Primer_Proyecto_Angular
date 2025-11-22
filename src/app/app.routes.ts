import { Routes } from '@angular/router';
import { RegistroProducto } from './pages/registro-producto/registro-producto';
import { Inicio } from './pages/inicio/inicio';
import { Listado } from './pages/listado/listado';
import { PersonajesSimpsons } from './pages/personajes-simpsons/personajes-simpsons';

export const routes: Routes = 
[
    { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    { path: 'inicio', component: Inicio},
    { path: 'producto/registrar', component: RegistroProducto},
    { path: 'listado', component: Listado},
    { path: 'personajes-simpsons', component: PersonajesSimpsons}
];
