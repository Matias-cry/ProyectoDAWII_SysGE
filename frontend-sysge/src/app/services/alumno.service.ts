import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = '/api/alumnos';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  guardar(alumno: any): Observable<any> {
    return this.http.post(this.apiUrl, alumno);
  }

  actualizar(id: number, alumno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, alumno);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}