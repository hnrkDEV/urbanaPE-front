import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminCard {
  id: number;
  numeroCartao: number;
  nome: string;
  status: boolean;
  tipoCartao: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';
}

@Injectable({
  providedIn: 'root',
})
export class AdminCardService {
  private baseUrl = `${environment.apiUrl}/admin/cards`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AdminCard[]> {
    return this.http.get<AdminCard[]>(this.baseUrl);
  }

  toggle(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/toggle`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
