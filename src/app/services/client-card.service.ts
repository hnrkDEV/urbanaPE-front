import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ClientCard {
  id: number;
  numeroCartao: number;
  nome: string;
  status: boolean;
  tipoCartao: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';
  saldo: number;
  limite: number;
}

@Injectable({ providedIn: 'root' })
export class ClientCardService {
  private baseUrl = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  getMyCards() {
    return this.http.get<ClientCard[]>(this.baseUrl);
  }

  toggle(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }

  credit(cardId: number, valor: number) {
    return this.http.patch<void>(`${this.baseUrl}/${cardId}/credit`, {
      valor,
    });
  }
}
