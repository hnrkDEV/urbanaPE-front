import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="dialog">
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>

      <div class="actions">
        <button class="btn ghost" (click)="close(false)">Cancelar</button>
        <button class="btn danger" (click)="close(true)">
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog {
        padding: 1.5rem;
        max-width: 360px;
      }

      h2 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: #0f172a;
      }

      p {
        font-size: 0.9rem;
        color: #475569;
        margin-bottom: 1.25rem;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }

      .btn {
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        font-size: 0.8rem;
        border: none;
        cursor: pointer;
      }

      .btn.ghost {
        background: #e5e7eb;
        color: #374151;
      }

      .btn.danger {
        background: #fee2e2;
        color: #991b1b;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      confirmText?: string;
    }
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
