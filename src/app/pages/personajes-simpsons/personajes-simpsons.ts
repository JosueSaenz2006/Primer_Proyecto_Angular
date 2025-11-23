import { Component, OnInit, inject } from '@angular/core';
import { SimpsonsApiService, Character, Episode, Location } from '../../services/simpsons-api.service';

@Component({
  selector: 'app-personajes-simpsons',
  standalone: true,
  imports: [],
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
    // Cargamos los personajes
    this.simpsonsService.getCharacters().subscribe({
      next: (data) => {
        this.personajes = data;
        console.log('Personajes cargados:', this.personajes);
      },
      error: (err) => console.error('Error al cargar personajes:', err)
    });

    // Cargamos episodios y locaciones para tenerlos listos
    this.simpsonsService.getEpisodes().subscribe(data => this.episodios = data);
    this.simpsonsService.getLocations().subscribe(data => this.locaciones = data);
  }

  // Acción al hacer clic en "Ver detalles"
  seleccionarPersonaje(personaje: Character) {
    this.personajeSeleccionado = personaje;
    
    // Limpiamos selecciones previas
    this.locacionSeleccionada = null;
    this.episodiosRelacionados = [];
  }

  // Acción para mostrar locación
  verLocacion() {
    if (this.locaciones.length > 0) {
        // Simulamos buscando por nombre o mostrando una aleatoria
        // En un caso real, buscaríamos por ID si la API lo tuviera vinculado
        const random = Math.floor(Math.random() * this.locaciones.length);
        this.locacionSeleccionada = this.locaciones[random];
    }
  }

  // Acción para mostrar episodios
  verEpisodios() {
    if (this.personajeSeleccionado) {
      const nombre = this.personajeSeleccionado.name;
      // Filtro simple por nombre
      this.episodiosRelacionados = this.episodios.filter(ep => 
        ep.name.includes(nombre) || (ep.description && ep.description.includes(nombre))
      );

      // Fallback: si no encuentra nada, mostramos algunos generales
      if (this.episodiosRelacionados.length === 0) {
        this.episodiosRelacionados = this.episodios.slice(0, 5);
      }
    }
  }
}
