import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "./components/menu/menu.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./shared/loader/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, MatButtonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  modoOscuro: boolean = true;

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const guardado = localStorage.getItem('modo-oscuro');
      if (guardado !== null) {
        this.modoOscuro = guardado === 'true';
      }
    }
    this.actualizarClaseBody();
  }

  toggleModoOscuro(): void {
    this.modoOscuro = !this.modoOscuro;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('modo-oscuro', String(this.modoOscuro));
    }
    this.actualizarClaseBody();
  }

  actualizarClaseBody(): void {
    if (typeof document !== 'undefined') {
      if (this.modoOscuro) {
        document.body.classList.add('modo-oscuro');
      } else {
        document.body.classList.remove('modo-oscuro');
      }
    }
  }
}