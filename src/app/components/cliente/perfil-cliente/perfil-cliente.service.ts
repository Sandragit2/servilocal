import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/perfil`);
  }

  actualizarPerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/perfil`, data);
  }

}
