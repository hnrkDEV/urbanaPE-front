import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        const token = localStorage.getItem('token');

        if (!token) {
          this.error = 'Token não encontrado';
          return;
        }

        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      },
      error: (err) => {
        this.error = 'Erro ao autenticar';
      },
    });
  }
}
