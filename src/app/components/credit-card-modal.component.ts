import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-credit-card-modal',
  imports: [CommonModule, FormsModule, DecimalPipe],
  styleUrl: './credit-card-modal.component.css',
  template: `
    <div class="dialog-clientCard">
      <h2 class="h2-clientCard">Adicionar crédito</h2>

      <p class="info-clientCard">
        Saldo atual:
        <strong>R$ {{ data.saldo | number : '1.2-2' }}</strong
        ><br />
        Limite:
        <strong>R$ {{ data.limite | number : '1.2-2' }}</strong>
      </p>

      <div class="field-clientCard">
        <label>Valor</label>
        <input
          type="number"
          class="input-clientCard"
          [(ngModel)]="valor"
          min="1"
          placeholder="Digite o valor"
        />
      </div>

      <div class="actions-clientCard">
        <button class="btn ghost" (click)="close()">Cancelar</button>
        <button class="btn success" (click)="confirm()" [disabled]="!valor || valor <= 0">
          Confirmar
        </button>
      </div>
    </div>
  `,
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
