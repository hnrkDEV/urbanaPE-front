import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-create-card-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: `./create-card-modal.component.html`,
  styleUrl: './create-card-modal.component.css',
})
export class CreateCardModalComponent {
  nome = '';
  tipoCartao = '';

  constructor(private dialogRef: MatDialogRef<CreateCardModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close({
      nome: this.nome,
      tipoCartao: this.tipoCartao,
    });
  }
}
