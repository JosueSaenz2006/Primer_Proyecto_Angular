import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpsonsApiService, Character, Episode, Location } from '../../services/simpsons-api.service';

@Component({
  selector: 'app-personajes-simpsons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personajes-simpsons.html',
  styleUrl: './personajes-simpsons.scss'
})
export class PersonajesSimpsons implements OnInit {
  // Inyección del servicio
  private simpsonsService = inject(SimpsonsApiService);

  // Variables de datos
  personajes: Character[] = [];
  episodios: Episode[] = [];
  locaciones: Location[] = [];

  // Variables de estado para la selección
  personajeSeleccionado: Character | null = null;
  locacionSeleccionada: Location | null = null;
  episodiosRelacionados: Episode[] = [];

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.simpsonsService.getCharacters().subscribe({
      next: (data) => {
        console.log('Personajes desde API:', data);
        this.personajes = data;
      },
      error: (err) => console.error('Error al cargar personajes:', err)
    });

    this.simpsonsService.getEpisodes().subscribe({
      next: (data) => this.episodios = data,
      error: (err) => console.error('Error al cargar episodios:', err)
    });

    this.simpsonsService.getLocations().subscribe({
      next: (data) => this.locaciones = data,
      error: (err) => console.error('Error al cargar locaciones:', err)
    });
  }

  // 👉 AQUÍ armamos la URL correcta de la imagen
  getImagenPersonaje(personaje: Character): string {
    if (!personaje.portrait_path) {
      // Fallback si no hay imagen (puedes cambiarlo por una de tus assets)
      return 'https://via.placeholder.com/200x200?text=Sin+foto';
    }

    // La doc dice: https://cdn.thesimpsonsapi.com/{size}{image_path}
    // portrait_path viene como /character/1.webp
    return `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;
  }

  // Acción al hacer clic en "Ver detalles"
  seleccionarPersonaje(personaje: Character) {
    this.personajeSeleccionado = personaje;
    
    // Limpiamos selecciones previas
    this.locacionSeleccionada = null;
    this.episodiosRelacionados = [];
  }

  // Cerrar el panel de detalles
  cerrarDetalles() {
    this.personajeSeleccionado = null;
    this.locacionSeleccionada = null;
    this.episodiosRelacionados = [];
  }

  // Acción para mostrar locación
  verLocacion() {
    if (this.locaciones.length > 0) {
        const random = Math.floor(Math.random() * this.locaciones.length);
        this.locacionSeleccionada = this.locaciones[random];
    }
  }

  // Acción para mostrar episodios
  verEpisodios() {
    if (this.personajeSeleccionado) {
      const nombre = this.personajeSeleccionado.name;
      this.episodiosRelacionados = this.episodios.filter(ep => 
        ep.name.includes(nombre) || (ep.description && ep.description.includes(nombre))
      );

      if (this.episodiosRelacionados.length === 0) {
        this.episodiosRelacionados = this.episodios.slice(0, 5);
      }
    }
  }
}
