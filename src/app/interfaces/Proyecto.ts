export interface Proyecto {
  id: number;
  categoria: 'videojuego' | 'web';
  titulo: string;
  descripcion: string;
  fecha?: string;
  vigente?: boolean;
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  logo?: string[];
  imagenes: string[];
  videoUrl?: string;
  enlaceCodigo?: string;
  enlaceDescarga?: string;
  enlaceDemo?: string;
  destacado?: boolean;
  medios?: string[];
  currentSlide?: number;
  expandido?: boolean;
  
  rol?: string;
  lugar?: string;
  colaboradores?: string[];
  retos?: string[];
  logros?: string[];
  problema?: string;
  solucion?: string;
  arquitectura?: string[];
  avances?: string[];
}
