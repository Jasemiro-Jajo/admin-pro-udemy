import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public router: Router,
               public usuarioServive: UsuarioService ) {

  }

  canActivate() {
    if ( this.usuarioServive.estaLogueado() ) {
      return true;
    } else {
      console.log( 'Bloqueado por el Guard' );
      this.router.navigate(['login']);
      return false;
    }
  }

}
