import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces para tipar los datos de la API
export interface Character {
  id: number;
  name: string;
  normalized_name: string;
  gender?: string;
  age?: number;
  occupation?: string;
  portrait_path?: string; // 👈 ruta de la imagen
  status?: string;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  episode: number;
  air_date?: string;
  description?: string;
}

export interface Location {
  id: number;
  name: string;
  normalized_name?: string;
}

// Interfaces para las respuestas paginadas
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class SimpsonsApiService {
  private readonly baseUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) {}

  // Obtener todos los personajes
  getCharacters(): Observable<Character[]> {
    return this.http
      .get<PaginatedResponse<Character>>(`${this.baseUrl}/characters`)
      .pipe(map(response => response.results));
  }

  // Obtener todos los episodios
  getEpisodes(): Observable<Episode[]> {
    return this.http
      .get<PaginatedResponse<Episode>>(`${this.baseUrl}/episodes`)
      .pipe(map(response => response.results));
  }

  // Obtener todas las locaciones
  getLocations(): Observable<Location[]> {
    return this.http
      .get<PaginatedResponse<Location>>(`${this.baseUrl}/locations`)
      .pipe(map(response => response.results));
  }
  
  // Buscar un personaje específico por ID
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/characters/${id}`);
  }
}
