import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Usuarios del Sistema</h2>
      
      <div class="card" *ngIf="editando">
        <h3>Editar Usuario: {{ usuarioEdit.username }}</h3>
        <div class="form-group">
          <label>Nombre de Usuario:</label>
          <input type="text" [(ngModel)]="usuarioEdit.nombre">
        </div>
        <div class="form-group">
          <label>Rol:</label>
          <select [(ngModel)]="usuarioEdit.rol">
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="ESTUDIANTE">Usuario / Alumno</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nueva Contraseña (dejar vacío para no cambiar):</label>
          <input type="password" [(ngModel)]="usuarioEdit.password">
        </div>
        <button (click)="guardarCambios()" class="save-btn">Actualizar Usuario</button>
        <button (click)="cancelar()" class="cancel-btn">Cancelar</button>
      </div>

      <hr>

      <h3>Usuarios Registrados</h3>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of usuarios">
            <td>{{ u.dni }}</td>
            <td>{{ u.nombre }}</td>
            <td>
                <span class="role-badge" [ngClass]="{'admin-badge': u.rol === 'ADMINISTRADOR'}">
                    {{ u.rol }}
                </span>
            </td>
            <td>
              <button (click)="editar(u)" class="edit-btn">Editar</button>
              <button (click)="eliminar(u.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fefefe; max-width: 400px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, select { width: 100%; padding: 8px; box-sizing: border-box; }
    button { padding: 8px 15px; border: none; cursor: pointer; border-radius: 4px; margin-right: 5px; font-weight: bold; }
    .save-btn { background: #2ecc71; color: white; }
    .cancel-btn { background: #95a5a6; color: white; }
    .edit-btn { background: #f1c40f; color: black; }
    .delete-btn { background: #e74c3c; color: white; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f2f2f2; }
    .role-badge { background: #bdc3c7; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; }
    .admin-badge { background: #f1c40f; color: black; }
  `]
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  editando = false;
  usuarioEdit: any = {};

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  editar(u: any) {
    this.editando = true;
    this.usuarioEdit = { ...u, password: '' }; // No cargamos la contraseña por seguridad
  }

  guardarCambios() {
    this.usuarioService.actualizar(this.usuarioEdit.id, this.usuarioEdit).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente');
        this.editando = false;
        this.cargarUsuarios();
      },
      error: () => alert('Error al actualizar usuario')
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar este usuario? No podrá volver a iniciar sesión.')) {
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.cargarUsuarios();
        },
        error: () => alert('Error al eliminar usuario')
      });
    }
  }

  cancelar() {
    this.editando = false;
    this.usuarioEdit = {};
  }
}