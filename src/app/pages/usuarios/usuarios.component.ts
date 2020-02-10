import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor( public usuarioService: UsuarioService,
               public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {

    this.modalUploadService.mostratModal('usuarios', id);

  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
              });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if( termino.length <= 0 ) {
      this.cargarUsuarios();
      return true;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuarios( termino )
          .subscribe( (usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.cargando = false;
          });
  }

  borrarUsuario( usuario: Usuario ) {

    if( usuario._id === this.usuarioService.usuario._id ) {

      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    })
    .then( borrar => {



      console.log(borrar);

      if ( borrar ) {

        this.usuarioService.borrarUsuario( usuario._id )
                  .subscribe( borrado => {
                    console.log(borrado);
                    this.cargarUsuarios();
                  });

      }
    });
  }

  guardarUsuario( usuario: Usuario ) {

    this.usuarioService.actualizarUsuario( usuario )
            .subscribe();
  }



}
