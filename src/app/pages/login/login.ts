import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';

import { animate, style, transition, trigger } from '@angular/animations';

interface JwtPayload {
  role: 'ADMIN' | 'CLIENT';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class Login {
  email = '';
  senha = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    const loadingToast = this.toastr.info(
      'Fazendo login... Isso pode levar alguns segundos.',
      'Aguarde',
      {
        disableTimeOut: true,
        closeButton: false,
      }
    );

    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.toastr.clear(loadingToast?.toastId);

        const token = localStorage.getItem('token');
        if (!token) {
          this.toastr.error('Token não encontrado', 'Erro');
          return;
        }

        const decoded = jwtDecode<JwtPayload>(token);
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');

        if (decoded.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      },
      error: (err) => {
        this.toastr.clear(loadingToast?.toastId);

        if (err.status === 401) {
          this.toastr.error(err.error?.message || 'Credenciais inválidas', 'Falha no login');
        } else if (err.status === 403) {
          this.toastr.error('Acesso não autorizado', 'Permissão');
        } else {
          this.toastr.error('Servidor iniciando… tente novamente em alguns segundos', 'Erro');
        }
      },
    });
  }
}
