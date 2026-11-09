import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión - SysGE</h2>
      <form (submit)="onLogin()">
        <input type="text" [(ngModel)]="credentials.dni" name="dni" placeholder="Dni" required>
        <input type="password" [(ngModel)]="credentials.password" name="password" placeholder="Contraseña" required>
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes una cuenta? <a (click)="goToRegister()">Regístrate aquí</a></p>
    </div>
  `,
  styles: [`
    .login-container { max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background: white; }
    input { width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px; }
    p { text-align: center; margin-top: 15px; font-size: 0.9em; }
    a { color: #007bff; cursor: pointer; text-decoration: underline; }
  `]
})
export class LoginComponent {
  credentials = { dni: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/matriculas']),
      error: (err) => alert('Error de autenticación: Verifique sus credenciales')
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}