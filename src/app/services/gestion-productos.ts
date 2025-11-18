import { Injectable } from '@angular/core';

export interface Producto {
  codigo: number;
  nombre: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class GestionProductos {
  private productos: Producto[] = [];

  getAll(): Producto[] {
    return this.productos;
  }

  get(index: number): Producto | undefined {
    return this.productos[index];
  }

  add(codigo: number, nombre: string, stock: number): void {
    this.productos.push({
      codigo: codigo,
      nombre: nombre,
      stock: stock
    });
  }

  update(index: number, codigo: number, nombre: string, stock: number): void {
    if (this.productos[index]) {
      this.productos[index] = {
        codigo: codigo,
        nombre: nombre,
        stock: stock
      };
    }
  }
}
