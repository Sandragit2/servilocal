import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('NombreClaveToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/perfil`, {
      headers: this.getHeaders()
    });
  }

  actualizarPerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/perfil`, data, {
      headers: this.getHeaders()
    });
  }

}

