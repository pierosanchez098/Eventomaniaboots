import { Component, OnInit } from '@angular/core';
import { Evento } from './models/evento.model';
import data from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  eventos: Evento[] = [];
  dataactual: Date;
  direccionesUnicas: string[] = [];
  direccionSeleccionada: string = '';
  eventosFiltrados: Evento[] = []; 

  ngOnInit() {
    const json: any = data;
    this.eventos = json;
    this.eventos.map((value) => value.fecha = new Date(value.fecha));
    this.dataactual = new Date();
    this.direccionesUnicas = this.obtenerDireccionesUnicas();
    this.filtrarEventosPorDireccion(); 
  }

  EventosPasados() {
    return this.eventosFiltrados.filter(Evento => Evento.fecha <= this.dataactual);
  }

  EventosProximos() {
    return this.eventosFiltrados.filter(Evento => Evento.fecha >= this.dataactual);
  }

  obtenerDireccionesUnicas(): string[] {
    const direccionesSet = new Set<string>();
    this.eventos.forEach(evento => direccionesSet.add(evento.direccion));
    return Array.from(direccionesSet);
  }

  

  filtrarEventosPorDireccion() {
    if (this.direccionSeleccionada === "") {
      this.eventosFiltrados = this.eventos;
    } else {
      this.eventosFiltrados = this.eventos.filter(evento => evento.direccion === this.direccionSeleccionada);
    }
  }

}
