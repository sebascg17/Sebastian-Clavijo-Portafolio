import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Contacto {
  contacto: {
    github: string;
    linkedin: string;
    unity: string;
    itchio: string;
    correo: string;
    cv: string;
  };
}

@Component({
  standalone: true,
  selector: 'app-contacto',
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contacto!: Contacto;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Contacto>('assets/data/perfil.json').subscribe(data => {
      this.contacto = data;
    });
  }
}
