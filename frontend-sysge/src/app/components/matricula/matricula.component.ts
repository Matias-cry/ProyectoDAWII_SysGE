import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { MatriculaService } from '../../services/matricula.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Matrículas</h2>
      
      <!-- Mensaje de error de Resiliencia -->
      <div class="alert error" *ngIf="errorMessage">
        ⚠️ {{ errorMessage }}
      </div>

      <div class="card">
        <h3>{{ editando ? 'Editar Matrícula' : 'Nueva Matrícula' }}</h3>
        <div class="form-group">
          <label>Alumno:</label>
          <select [(ngModel)]="nuevaMatricula.alumnoId">
            <option *ngFor="let a of alumnos" [value]="a.id">{{a.nombres}} {{a.apellidos}}</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Curso:</label>
          <select [(ngModel)]="nuevaMatricula.cursoId">
            <option *ngFor="let c of cursos" [value]="c.id">{{c.nombre}} ({{c.creditos}} cred)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Ciclo:</label>
          <input type="text" [(ngModel)]="nuevaMatricula.ciclo" placeholder="Ej: 2024-I">
        </div>

        <button (click)="guardar()">{{ editando ? 'Actualizar' : 'Registrar Matrícula' }}</button>
        <button *ngIf="editando" (click)="cancelar()" class="cancel-btn">Cancelar</button>
      </div>

      <hr>

      <h3>Historial de Matrículas</h3>
      <table>
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Curso</th>
            <th>Ciclo</th>
            <th>Fecha</th>
            <th *ngIf="authService.isAdmin()">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let m of matriculas">
            <td>
              <span [class.fallback-text]="m.alumno?.nombres?.includes('No Disponible')">
                {{m.alumno?.nombres}} {{m.alumno?.apellidos}}
              </span>
            </td>
            <td>
              <span [class.fallback-text]="m.curso?.nombre?.includes('No Disponible')">
                {{m.curso?.nombre}}
              </span>
            </td>
            <td>{{m.ciclo}}</td>
            <td>{{m.fechaMatricula | date:'dd/MM/yyyy'}}</td>
            <td *ngIf="authService.isAdmin()">
              <button (click)="editar(m)" class="edit-btn">Editar</button>
              <button (click)="eliminar(m.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; font-family: sans-serif; }
    .alert { padding: 15px; margin-bottom: 20px; border-radius: 4px; font-weight: bold; }
    .alert.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .fallback-text { color: #856404; font-style: italic; font-weight: bold; }
    .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #f9f9f9; max-width: 500px; }
    .form-group { margin-bottom: 10px; }
    label { display: block; font-weight: bold; }
    select, input { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
    button { background: #28a745; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; margin-top: 10px; }
    .cancel-btn { background: #6c757d; }
    .edit-btn { background: #ffc107; color: black; padding: 5px 10px; border: none; cursor: pointer; border-radius: 4px; margin-right: 5px; }
    .delete-btn { background: #dc3545; color: white; padding: 5px 10px; border: none; cursor: pointer; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
    th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
    th { background: #eee; }
  `]
})
export class MatriculaComponent implements OnInit {
  alumnos: any[] = [];
  cursos: any[] = [];
  matriculas: any[] = [];
  errorMessage: string | null = null;
  editando = false;
  matriculaIdParaEditar: number | null = null;
  nuevaMatricula: any = { alumnoId: null, cursoId: null, ciclo: '' };

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private matriculaService: MatriculaService,
    public authService: AuthService
  ) {}

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    this.errorMessage = null;
    this.alumnoService.listar().subscribe(data => this.alumnos = Array.isArray(data) ? data : []);
    this.cursoService.listar().subscribe(data => this.cursos = Array.isArray(data) ? data : []);
    
    this.matriculaService.listar().subscribe({
      next: (data) => {
        if (data && (data as any).error) {
          this.errorMessage = (data as any).error;
          this.matriculas = [];
        } else {
          this.matriculas = Array.isArray(data) ? data : [];
        }
      },
      error: () => this.errorMessage = "Servidor de matrículas no disponible."
    });
  }

  guardar() {
    const observer = {
      next: (res: any) => {
        if (res && res.error) alert(res.error);
        else { this.resetForm(); this.cargarDatos(); }
      },
      error: () => alert('Error en el servicio de matrículas.')
    };

    if (this.editando) {
      this.matriculaService.actualizar(this.matriculaIdParaEditar!, this.nuevaMatricula).subscribe(observer);
    } else {
      this.matriculaService.matricular(this.nuevaMatricula).subscribe(observer);
    }
  }

  editar(m: any) {
    this.editando = true;
    this.matriculaIdParaEditar = m.id;
    this.nuevaMatricula = { alumnoId: m.alumno?.id, cursoId: m.curso?.id, ciclo: m.ciclo };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar matrícula?')) {
      this.matriculaService.eliminar(id).subscribe(() => this.cargarDatos());
    }
  }

  cancelar() { this.resetForm(); }
  resetForm() { this.nuevaMatricula = { alumnoId: null, cursoId: null, ciclo: '' }; this.editando = false; }
}