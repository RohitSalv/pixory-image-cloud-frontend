import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-why-pixory',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './why-pixory.html'
})
export class WhyPixory {
  readonly XIcon = X;
}