import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  nome = '';
  email = '';
  senha = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = '';
    this.loading = true;

    this.authService.register(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erro ao registrar usuário';
        this.loading = false;
      },
    });
  }
}
