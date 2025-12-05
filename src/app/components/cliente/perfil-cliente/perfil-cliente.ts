import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilClienteService } from './perfil-cliente.service';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-cliente.html',
  styleUrls: ['./perfil-cliente.css']
})
export class PerfilCliente implements OnInit {

  form!: FormGroup;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilClienteService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      apellidos: [''],
      correo: [{ value: '', disabled: true }],
      telefono: [''],
      direccion: ['']
    });

    this.cargarPerfil();
  }

  cargarPerfil() {
    this.perfilService.obtenerPerfil().subscribe({
      next: (resp) => {
        this.form.patchValue(resp.usuario);
      },
      error: () => {
        this.mensaje = 'Error al cargar el perfil';
      }
    });
  }

  guardar() {
    const data = this.form.getRawValue();

    this.perfilService.actualizarPerfil(data).subscribe({
      next: () => {
        this.mensaje = 'Perfil actualizado correctamente';
      },
      error: () => {
        this.mensaje = 'Error al actualizar el perfil';
      }
    });
  }

}



