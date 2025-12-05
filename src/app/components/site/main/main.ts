import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Menu } from '../../../layouts/menu/menu';
import { Footer } from '../../../layouts/footer/footer';
import { ServiciosLista } from "../../servicios-lista/servicios-lista";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, Menu, Footer, ServiciosLista],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Main implements OnInit {
  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
    this.authService.identity$.subscribe((usr) => (this.usuario = usr));
  }
}

