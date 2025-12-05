import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })

export class MainService{

  public url: string;

  constructor(
    public _http: HttpClient
  ){

    this.url = environment.url;

  }

  testPost( email, password ):Observable<any>{

    let data = JSON.stringify({
      "email" : email,
      "password" : password
    });

    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

    return this._http.post(this.url + "auth/login", data, {headers: headers});

  }

  getToken( email ):Observable<any>{

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Token_de_autorizacion' );

    return this._http.get(
        this.url + "main/token?correo="+email,
        { headers: headers }
      );

  }
/*
  obtenerUsuarios( lista_usuarios):Observable<any>{

    let headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'Token_de_autorizacion');

    return this._http.get(
      this.url + /
    )
  }*/
  

}
