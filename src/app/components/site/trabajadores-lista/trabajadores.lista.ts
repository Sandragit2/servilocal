import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { storeService } from '../../../services/store.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-trabajadores-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.lista.html',
  styleUrls: ['./trabajadores.lista.css'],
})
export class TrabajadoresLista implements OnInit {
  backendUrl = environment.url;

  trabajadores: any[] = [];
  filtrados: any[] = [];

  cargando = false;
  errorMsg = '';

  // filtros
  categoriaSeleccionada: string = 'todos';
  busqueda: string = '';

  categoriasDisponibles: { id: string; nombre: string }[] = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'albañiles', nombre: 'Albañiles' },
    { id: 'electricistas', nombre: 'Electricistas' },
    { id: 'tutores', nombre: 'Tutores' },
    // agrega más si los tienes en tu BD
  ];

  constructor(private storeSrv: storeService) {}

  ngOnInit(): void {
    this.cargarTrabajadores();
  }

  cargarTrabajadores(): void {
    this.cargando = true;
    this.errorMsg = '';

    this.storeSrv.getTrabajadores().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.trabajadores = res.lista_trabajadores || [];
          this.aplicarFiltros();
        } else {
          this.errorMsg = 'No se pudieron cargar los trabajadores.';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Ocurrió un error al cargar los trabajadores.';
        this.cargando = false;
      },
    });
  }

  cambiarCategoria(catId: string): void {
    this.categoriaSeleccionada = catId;
    this.aplicarFiltros();
  }

  onBuscarCambio(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let lista = [...this.trabajadores];

    // por categoría
    if (this.categoriaSeleccionada !== 'todos') {
      lista = lista.filter((t) =>
        (t.categoria || '').toLowerCase().includes(this.categoriaSeleccionada.toLowerCase())
      );
    }

    // por texto (nombre, habilidades, ubicación)
    const q = this.busqueda.trim().toLowerCase();
    if (q) {
      lista = lista.filter((t) => {
        const nombre = (t.nombre || '').toLowerCase();
        const habilidades = (t.habilidades || '').toLowerCase();
        const ubicacion = (t.ubicacion || '').toLowerCase();
        return nombre.includes(q) || habilidades.includes(q) || ubicacion.includes(q);
      });
    }

    this.filtrados = lista;
  }

  getFoto(t: any): string {
    if (t?.foto_trabajador) {
      // en la BD tienes rutas tipo "static/uploads/archivo.jpg"
      return this.backendUrl + t.foto_trabajador;
    }
    return 'assets/img/default-user.png';
  }

  // Si luego quieres ir al detalle:
  // verDetalle(t: any) {
  //   this.router.navigate(['/store', 'detalle', t.id_trabajador]);
  // }
}
