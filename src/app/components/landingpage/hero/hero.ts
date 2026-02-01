import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, ArrowRight, Shield, Lock, Check } from 'lucide-angular';
import { RouterLink } from "@angular/router";
import { AppDashboard } from "../app-dashboard/app-dashboard";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, AppDashboard],
  templateUrl: './hero.html',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Hero {
  readonly icons = { ArrowRight, Shield, Lock, Check };
}