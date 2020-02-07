import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal Upload Listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostratModal( tipo: string, id: string ) {

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

  }
}
