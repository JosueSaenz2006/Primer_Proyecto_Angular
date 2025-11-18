import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionProductos, Producto } from '../../services/gestion-productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.html',
  styleUrls: ['./listado.scss'],
})
export class Listado implements OnInit
{
  productos: Producto[] = [];

  constructor(private gp: GestionProductos, private router: Router) {}

  ngOnInit(): void
  {
    this.productos = this.gp.getAll();
  }

  editar(index: number) {
    this.router.navigate(['/producto/registrar'], { queryParams: { index: index } });
  }
}
