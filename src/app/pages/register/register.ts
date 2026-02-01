import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class Register {
  nome = '';
  email = '';
  senha = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register() {
    this.authService
      .register(this.nome, this.email, this.senha)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Registro realizado com sucesso!', 'Bem-vindo');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(
            err.error?.message || 'Erro ao registrar. Tente novamente.',
            'Falha no Registro'
          );
        },
      });
  }
}
