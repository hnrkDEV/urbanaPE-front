import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css',
})
export class ClientLayout {}
