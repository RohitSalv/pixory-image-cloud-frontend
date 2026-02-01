import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Search, Sparkles, Upload, Image } from 'lucide-angular';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-app-dashboard',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './app-dashboard.html',
  styleUrl: './app-dashboard.css',
  animations: [
    // Replicates whileHover={{ scale: 1.02 }}
    trigger('hoverScale', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.02)' })),
      transition('normal <=> hovered', [animate('300ms ease-out')]),
    ]),
    // Replicates the "Processing..." pulse opacity
    trigger('pulse', [
      transition(':enter', [
        animate('2s infinite', keyframes([
          style({ opacity: 0.5, offset: 0 }),
          style({ opacity: 1, offset: 0.5 }),
          style({ opacity: 0.5, offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class AppDashboard {
  readonly Upload = Upload;
  readonly Sparkles = Sparkles;
  readonly Search = Search;
  readonly Image = Image;

  isHovered = false;

}
