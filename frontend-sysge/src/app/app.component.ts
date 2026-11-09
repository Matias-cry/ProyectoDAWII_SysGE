import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="main-header">
      <div class="logo">
        <h1>SysGE</h1>
      </div>
      <nav *ngIf="authService.isLoggedIn()">
        <a *ngIf="authService.isAdmin()" routerLink="/alumnos" routerLinkActive="active">Alumnos</a>
        <a *ngIf="authService.isAdmin()" routerLink="/cursos" routerLinkActive="active">Cursos</a>
        <!-- Nueva opción para gestionar usuarios -->
        <a *ngIf="authService.isAdmin()" routerLink="/usuarios" routerLinkActive="active">Usuarios</a>
        <a routerLink="/matriculas" routerLinkActive="active">Matrículas</a>
      </nav>
      <div class="user-info" *ngIf="authService.isLoggedIn()">
        <span class="user-details">
          Bienvenido, <strong>{{ userInfo?.nombre }}</strong> 
          <span class="role-badge" [ngClass]="{'admin-badge': authService.isAdmin()}">
            {{ userInfo?.rol }}
          </span>
        </span>
        <button class="logout-btn" (click)="logout()">Cerrar Sesión</button>
      </div>
    </header>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-header { background-color: #2c3e50; color: white; padding: 0 20px; display: flex; align-items: center; height: 60px; }
    .logo h1 { margin: 0; font-size: 1.5rem; color: #3498db; }
    nav { display: flex; margin-left: 30px; }
    nav a { color: white; padding: 0 15px; text-decoration: none; line-height: 60px; }
    nav a:hover, nav a.active { background-color: #34495e; color: #3498db; }
    .user-info { display: flex; align-items: center; margin-left: auto; }
    .user-details { margin-right: 20px; font-size: 0.9rem; }
    .role-badge { background-color: #95a5a6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; }
    .admin-badge { background-color: #f1c40f; color: black; font-weight: bold; }
    .logout-btn { background: #e74c3c; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px; }
    .main-content { padding: 20px; }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  get userInfo() {
    return this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}