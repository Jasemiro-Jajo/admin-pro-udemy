import { Routes, RouterModule } from '@angular/router';



import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const RUTAS: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },



  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( RUTAS, { useHash: true } );
