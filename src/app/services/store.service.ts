// src/app/services/store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class storeService {
  public url: string;

  constructor(
    private _http: HttpClient,
    private authService: AuthService
  ) {
    this.url = environment.url; // ej. 'http://127.0.0.1:5000/'
  }

  /** Construye headers con JSON + (opcional) JWT */
  private buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /** 🔹 Obtener TODOS los trabajadores (por si luego lo usas en Admin) */
  getTrabajadores(): Observable<any> {
    return this._http.get(
      `${this.url}store/store`,
      { headers: this.buildHeaders() }
    );
  }

  /** 🔹 Obtener trabajadores FILTRADOS por tipo (albañiles, electricista, tutor...) */
  getTrabajadoresPorTipo(tipo: string): Observable<any> {
    return this._http.get(
      `${this.url}store/trabajadores/${tipo}`,
      { headers: this.buildHeaders() }
    );
  }

  /** 🔹 Detalle de un trabajador */
  getTrabajadorDetalle(id: number): Observable<any> {
    return this._http.get(
      `${this.url}store/trabajador/${id}`,
      { headers: this.buildHeaders() }
    );
  }

  /** 🔹 Preferencia de Mercado Pago */
  getPreference(): Observable<any> {
    return this._http.get(
      `${this.url}preferencemp`,
      { headers: this.buildHeaders() }
    );
  }

  /** 🔹 Enviar datos de pago al backend (cuando lo tengas listo) */
  processPayment(data: any): Observable<any> {
    return this._http.post(
      `${this.url}processpayment`,
      data,
      { headers: this.buildHeaders() }
    );
  }
}

