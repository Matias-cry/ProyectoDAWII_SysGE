import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Registro de Usuario - SysGE</h2>
      <form (submit)="onRegister()">
        <input type="text" [(ngModel)]="user.dni" name="dni" placeholder="DNI" required>
        <input type="text" [(ngModel)]="user.nombre" name="nombre" placeholder="Nombre de usuario" required>
        <input type="password" [(ngModel)]="user.password" name="password" placeholder="Contraseña" required>
        <select [(ngModel)]="user.rol" name="rol" required>
          <option value="" disabled selected>Seleccione un rol</option>
          <option value="ADMINISTRADOR">Administrador</option>
          <option value="ESTUDIANTE">Usuario / Alumno</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes cuenta? <a (click)="goToLogin()">Inicia sesión aquí</a></p>
    </div>
  `,
  styles: [`
    .register-container { max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background: white; }
    input, select { width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; border-radius: 4px; }
    p { text-align: center; margin-top: 15px; font-size: 0.9em; }
    a { color: #007bff; cursor: pointer; text-decoration: underline; }
  `]
})
export class RegisterComponent {
  user = { dni: '', nombre: '', password: '', rol: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.user.dni || !this.user.nombre || !this.user.password || !this.user.rol) {
      alert('Por favor complete todos los campos');
      return;
    }
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        const msg = err.error?.error || err.message || 'Error desconocido';
        alert('Error al registrar: ' + msg);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}