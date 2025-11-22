import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionSimpsons 
{
  private urlBase = "https://thesimpsonsapi.com/api";

  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<any[]>
  {
    return this.http.get<any[]>(this.urlBase+"/characters");
  }
}
