import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInterface, UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css',
})
export class EditUserDialogComponent {
  nome = '';
  email = '';
  role: 'ADMIN' | 'CLIENT' = 'CLIENT';

  loading = false;
  error = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserInterface,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService: UserService
  ) {
    this.nome = user.nome;
    this.email = user.email;
    this.role = user.role;
  }

  save() {
    if (this.loading) return;

    this.loading = true;
    this.error = '';

    this.userService
      .updateUser(this.user.id, {
        nome: this.nome,
        email: this.email,
        role: this.role,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.error = err.error?.message || 'Erro ao atualizar usuário';
          this.loading = false;
        },
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
