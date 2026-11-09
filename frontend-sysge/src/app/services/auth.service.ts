import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos URL relativa. Nginx (puerto 80) hará de puente al Gateway (puerto 8080)
  private apiUrl = '/api/usuarios/auth';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const info = this.getUserInfo();
    return info?.rol === 'ADMINISTRADOR';
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  getUserInfo(): { dni: string, nombre: string, rol: string } | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.sub && decodedToken.role) {
      return { dni: decodedToken.dni, nombre: decodedToken.sub, rol: decodedToken.role };
    }
    return null;
  }
}