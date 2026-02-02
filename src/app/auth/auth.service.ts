import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('tokenType', response.tipo);
      })
    );
  }

  register(nome: string, email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      nome,
      email,
      senha,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }
}
