import { Component, OnInit } from '@angular/core';
import { GestionSimpsons } from '../gestion-simpsons/gestion-simpsons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personajes-simpsons',
  imports: [CommonModule, FormsModule],
  templateUrl: './personajes-simpsons.html',
  styleUrl: './personajes-simpsons.scss',
})
export class PersonajesSimpsons implements OnInit 
{
  personajes: any[] = [];
  ngOnInit(): void
  {
    this.gs.getPersonajes().subscribe({
      next: (resp:any) =>{
        this.personajes = resp;
        console.log('Personajes obtenidos:', this.personajes);
        this.personajes = resp.results;
        console.log("Personajes: ", this.personajes);
      },
      error: (err) =>{
        console.error('Error al obtener los personajes:', err);
      },
      complete: () =>{
        console.log('Consulta completada');
      }
    });
  }
  constructor(private gs: GestionSimpsons) {}

  editar(index: number): void {
    const personaje = this.personajes[index];
    console.log('Editando personaje:', personaje);
    // Aquí puedes agregar lógica para editar el personaje
  }

  eliminar(index: number): void {
    const personaje = this.personajes[index];
    if (confirm(`¿Estás seguro de eliminar a ${personaje.name}?`)) {
      this.personajes.splice(index, 1);
      console.log('Personaje eliminado:', personaje);
    }
  }
}
