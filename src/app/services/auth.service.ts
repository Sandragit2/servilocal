import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url; 

  identity: any = null;
  token: string | null = null;

  identity$ = new EventEmitter<any>();
  token$ = new EventEmitter<string | null>();

  constructor(private http: HttpClient) {}

  // 🔹 LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // 🔹 REGISTRO
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // 🔹 Guardar sesión completa
  saveSession(token: string, usuario: any): void {
    localStorage.setItem('NombreClaveToken', token);
    localStorage.setItem('NombreClaveIdtty', JSON.stringify(usuario));

    this.token = token;
    this.identity = usuario;

    this.token$.emit(token);
    this.identity$.emit(usuario);
  }

  // 🔹 Obtener token
  getToken(): string | null {
    const token = localStorage.getItem('NombreClaveToken');
    this.token = token;
    this.token$.emit(token);
    return token;
  }

  // 🔹 Obtener usuario actual
  getUsuario(): any {
    const identity = localStorage.getItem('NombreClaveIdtty');
    this.identity = identity ? JSON.parse(identity) : null;
    this.identity$.emit(this.identity);
    return this.identity;
  }

  // 🔹 Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 Verificar si el usuario tiene cierto rol
  hasRole(role: string): boolean {
    const user = this.getUsuario();
    return user?.rol === role;
  }

  // 🔹 Cerrar sesión
  logout(): void {
    localStorage.removeItem('NombreClaveToken');
    localStorage.removeItem('NombreClaveIdtty');

    this.token = null;
    this.identity = null;

    this.token$.emit(null);
    this.identity$.emit(null);
  }
}





