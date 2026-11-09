import { Routes } from '@angular/router'; // Corregido: de core a router
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { CursoComponent } from './components/curso/curso.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'cursos', component: CursoComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'matriculas', component: MatriculaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];