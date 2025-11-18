import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestionProductos } from '../../services/gestion-productos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-producto.html',
  styleUrl: './registro-producto.scss',
})
export class RegistroProducto implements OnInit
{
  codigo: number = 0;
  nombre: string = '';
  stock: number = 0;
  editIndex: number | null = null;

  constructor(
    private gp: GestionProductos,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['index'] !== undefined) {
        this.editIndex = +params['index'];
        const producto = this.gp.get(this.editIndex);
        if (producto) {
          this.codigo = producto.codigo;
          this.nombre = producto.nombre;
          this.stock = producto.stock;
        }
      }
    });
  }

  registrarProducto() {
    if (this.codigo > 0 && this.nombre && this.stock >= 0) {
      this.gp.add(this.codigo, this.nombre, this.stock);
      alert(`Producto registrado`);
      this.limpiarFormulario();
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }

  borrar() {
    this.limpiarFormulario();
    console.log('Borrar');
  }

  guardar() {
    if (this.codigo > 0 && this.nombre && this.stock >= 0) {
      if (this.editIndex !== null) {
        this.gp.update(this.editIndex, this.codigo, this.nombre, this.stock);
        console.log('Actualizar');
        alert(`Producto actualizado`);
        this.router.navigate(['/listado']);
      } else {
        this.gp.add(this.codigo, this.nombre, this.stock);
        console.log('Guardar');
        alert(`Producto guardado`);
        this.limpiarFormulario();
      }
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }

  limpiarFormulario() {
    this.codigo = 0;
    this.nombre = '';
    this.stock = 0;
  }
}
