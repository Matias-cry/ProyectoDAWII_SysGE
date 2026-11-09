import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Cursos</h2>
      
      <!-- Mensaje de error de Resiliencia -->
      <div class="alert error" *ngIf="errorMessage">
        ⚠️ {{ errorMessage }}
      </div>

      <div class="card" *ngIf="authService.isAdmin()">
        <h3>{{ editando ? 'Editar Curso' : 'Nuevo Curso' }}</h3>
        <input type="text" [(ngModel)]="nuevoCurso.nombre" placeholder="Nombre del Curso" required>
        <input type="number" [(ngModel)]="nuevoCurso.creditos" placeholder="Créditos" required>
        <button (click)="guardar()">{{ editando ? 'Actualizar' : 'Registrar Curso' }}</button>
        <button *ngIf="editando" (click)="cancelar()" class="cancel-btn">Cancelar</button>
      </div>

      <hr>

      <h3>Lista de Cursos</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th *ngIf="authService.isAdmin()">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of cursos">
            <td>{{c.codigo}}</td>
            <td>{{c.nombre}}</td>
            <td>{{c.creditos}}</td>
            <td *ngIf="authService.isAdmin()">
              <button (click)="editar(c)" class="edit-btn">Editar</button>
              <button (click)="eliminar(c.id)" class="delete-btn">Eliminar</button>
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
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  nuevoCurso: any = { nombre: '', creditos: null };
  errorMessage: string | null = null;
  editando = false;
  cursoIdParaEditar: number | null = null;

  constructor(private cursoService: CursoService, public authService: AuthService) {}

  ngOnInit() { this.listar(); }

  listar() { 
    this.errorMessage = null;
    this.cursoService.listar().subscribe({
      next: (data) => {
        if (data && (data as any).error) {
          this.errorMessage = (data as any).error;
          this.cursos = [];
        } else {
          this.cursos = Array.isArray(data) ? data : [];
        }
      },
      error: () => this.errorMessage = "No se pudo conectar con el servidor de cursos."
    });
  }

  guardar() {
    this.errorMessage = null;
    const observer = {
      next: (res: any) => {
        if (res && res.error) alert(res.error);
        else { this.resetForm(); this.listar(); }
      },
      error: () => alert('Error: El servicio de cursos no responde.')
    };

    if (this.editando) {
      this.cursoService.actualizar(this.cursoIdParaEditar!, this.nuevoCurso).subscribe(observer);
    } else {
      this.cursoService.guardar(this.nuevoCurso).subscribe(observer);
    }
  }

  editar(curso: any) {
    this.editando = true;
    this.cursoIdParaEditar = curso.id;
    this.nuevoCurso = { ...curso };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar curso?')) {
      this.cursoService.eliminar(id).subscribe({
        next: (res: any) => {
          if (res && res.error) alert(res.error);
          else this.listar();
        },
        error: () => alert('Error: Servicio no disponible.')
      });
    }
  }

  cancelar() { this.resetForm(); }
  resetForm() { this.nuevoCurso = { nombre: '', creditos: null }; this.editando = false; }
}