import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // =============================
  // 🔹 LOGIN
  // =============================
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // 🔹 REGISTRO
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // =============================
  // 🔹 GUARDAR SESIÓN
  // =============================
  saveSession(token: string, usuario: any): void {
    localStorage.setItem('NombreClaveToken', token);
    localStorage.setItem('NombreClaveIdtty', JSON.stringify(usuario));

    this.token = token;
    this.identity = usuario;

    this.token$.emit(token);
    this.identity$.emit(usuario);
  }

  // =============================
  // 🔹 OBTENER TOKEN
  // =============================
  getToken(): string | null {
    const token = localStorage.getItem('NombreClaveToken');
    this.token = token;
    this.token$.emit(token);
    return token;
  }

  // =============================
  // 🔹 OBTENER IDENTIDAD
  // =============================
  getUsuario(): any {
    const identity = localStorage.getItem('NombreClaveIdtty');
    this.identity = identity ? JSON.parse(identity) : null;
    this.identity$.emit(this.identity);
    return this.identity;
  }

  // =============================
  // 🔹 ¿ESTÁ LOGUEADO?
  // =============================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🔹 Validar Rol
  hasRole(role: string): boolean {
    const user = this.getUsuario();
    return user?.rol === role;
  }

  // =============================
  // 🔹 CERRAR SESIÓN
  // =============================
  logout(): void {
    localStorage.removeItem('NombreClaveToken');
    localStorage.removeItem('NombreClaveIdtty');

    this.token = null;
    this.identity = null;

    this.token$.emit(null);
    this.identity$.emit(null);
  }

  // ======================================================
  // 🚀🚀🚀 NUEVO: MÉTODOS PARA PERFIL DEL CLIENTE
  // ======================================================

  /** 🔸 Adjuntar token al header */
  private getAuthHeaders() {
    const token = this.getToken();
    if (!token) return {};

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  /** 🔸 Obtener perfil completo del cliente */
  getClientePerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/perfil`, this.getAuthHeaders());
  }

  /** 🔸 Actualizar perfil del cliente */
  updateClientePerfil(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cliente/perfil`, data, this.getAuthHeaders());
  }
}






