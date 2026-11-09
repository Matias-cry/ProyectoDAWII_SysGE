import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private apiUrl = '/api/matriculas';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  matricular(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizar(id: number, matricula: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, matricula);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}