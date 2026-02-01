import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-credit-card-modal',
  imports: [CommonModule, FormsModule, DecimalPipe],
  styleUrl: './credit-card-modal.component.css',
  templateUrl: `./credit-card-modal.component.html`,
})
export class CreditCardModalComponent {
  valor!: number;

  constructor(
    private dialogRef: MatDialogRef<CreditCardModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { saldo: number; limite: number }
  ) {}

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(this.valor);
  }
}
