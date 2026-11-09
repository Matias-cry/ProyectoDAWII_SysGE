import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Alumnos</h2>
      
      <div class="alert error" *ngIf="errorMessage">
        ⚠️ {{ errorMessage }}
      </div>

      <div class="card" *ngIf="authService.isAdmin()">
        <h3>{{ editando ? 'Editar Alumno' : 'Nuevo Alumno' }}</h3>
        <input type="text" [(ngModel)]="nuevoAlumno.dni" placeholder="Dni" required>
        <input type="text" [(ngModel)]="nuevoAlumno.nombres" placeholder="Nombres" required>
        <input type="text" [(ngModel)]="nuevoAlumno.apellidos" placeholder="Apellidos" required>
        <input type="email" [(ngModel)]="nuevoAlumno.correo" placeholder="Correo electrónico" required>
        <button (click)="guardar()">{{ editando ? 'Actualizar' : 'Registrar' }}</button>
        <button *ngIf="editando" (click)="cancelar()" class="cancel-btn">Cancelar</button>
      </div>

      <hr>

      <h3>Lista de Alumnos</h3>
      <table>
        <thead>
          <tr>
            <th>Dni</th><th>Nombres</th><th>Apellidos</th><th>Correo</th>
            <th *ngIf="authService.isAdmin()">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of alumnos">
            <td>{{a.dni}}</td><td>{{a.nombres}}</td><td>{{a.apellidos}}</td><td>{{a.correo}}</td>
            <td *ngIf="authService.isAdmin()">
              <button (click)="editar(a)" class="edit-btn">Editar</button>
              <button (click)="eliminar(a.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .alert { padding: 15px; margin-bottom: 20px; border-radius: 4px; font-weight: bold; }
    .alert.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: white; max-width: 400px; margin-bottom: 20px; }
    input { width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
    button { background: #007bff; color: white; border: none; padding: 10px; width: 100%; cursor: pointer; border-radius: 4px; }
    .cancel-btn { background: #6c757d; margin-top: 5px; }
    .edit-btn { background: #ffc107; color: black; padding: 5px 10px; border: none; cursor: pointer; border-radius: 4px; margin-right: 5px; }
    .delete-btn { background: #dc3545; color: white; padding: 5px 10px; border: none; cursor: pointer; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #f2f2f2; }
  `]
})
export class AlumnoComponent implements OnInit {
  alumnos: any[] = [];
  nuevoAlumno: any = { dni: '', nombres: '', apellidos: '', correo: '' };
  errorMessage: string | null = null;
  editando = false;
  alumnoIdParaEditar: number | null = null;

  constructor(private alumnoService: AlumnoService, public authService: AuthService) {}

  ngOnInit() { this.listar(); }

  listar() { 
    this.errorMessage = null;
    this.alumnoService.listar().subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0 && data[0].error) {
          this.errorMessage = data[0].error;
          this.alumnos = [];
        } else if (data && data.error) {
          this.errorMessage = data.error;
          this.alumnos = [];
        } else {
          this.alumnos = Array.isArray(data) ? data : [];
        }
      },
      error: () => this.errorMessage = "Servidor de Alumnos fuera de servicio."
    });
  }

  guardar() {
    if (this.editando) {
      this.alumnoService.actualizar(this.alumnoIdParaEditar!, this.nuevoAlumno).subscribe(() => {
        this.resetForm();
        this.listar();
      });
    } else {
      this.alumnoService.guardar(this.nuevoAlumno).subscribe(() => {
        this.resetForm();
        this.listar();
      });
    }
  }

  editar(alumno: any) {
    this.editando = true;
    this.alumnoIdParaEditar = alumno.id;
    this.nuevoAlumno = { ...alumno };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar?')) {
      this.alumnoService.eliminar(id).subscribe(() => this.listar());
    }
  }

  cancelar() { this.resetForm(); }
  resetForm() {
    this.nuevoAlumno = { dni: '', nombres: '', apellidos: '', correo: '' };
    this.editando = false;
    this.alumnoIdParaEditar = null;
  }
}