// portafolio.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterModule } from '@angular/router';
import { BaseProyectoComponent } from '../../shared/BaseProyectoComponent';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule, MatCardModule, RouterLink, RouterModule],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent extends BaseProyectoComponent implements OnInit {
  @Input() maxLength: number = 250;
  destacados: Proyecto[] = [];
  mercabundyProyecto?: Proyecto;
  habilidades: Habilidad[] = [];
  filtroActivo: 'todos' | 'web' | 'videojuego' = 'todos';

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.http.get<Proyecto[]>('assets/data/proyectos.json').subscribe(proyectos => {
      this.destacados = proyectos
        .filter(p => p.destacado)
        .sort((a, b) => b.id - a.id)
        .map(p => {
          const videoUrl = p.videoUrl ? this.convertirVideoEmbed(p.videoUrl) : undefined;
          return {
            ...p,
            videoUrl,
            expandido: false,
            currentSlide: 0,
            medios: videoUrl ? [videoUrl, ...p.imagenes] : [...p.imagenes]
          };
        });

      this.mercabundyProyecto = this.destacados.find(p => p.id === 10 || p.titulo.toLowerCase().includes('mercabundy'));
    });

    this.http.get<Habilidad[]>('assets/data/habilidades.json').subscribe(data => {
      this.habilidades = data;
    });
  }

  setFiltro(filtro: 'todos' | 'web' | 'videojuego') {
    this.filtroActivo = filtro;
  }

  get proyectosVisibles(): Proyecto[] {
    if (this.filtroActivo === 'todos') {
      return this.destacados;
    }
    return this.destacados.filter(p => p.categoria === this.filtroActivo);
  }
}

