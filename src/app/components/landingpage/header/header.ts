import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, Sparkles } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class Header {

  readonly SparklesIcon = Sparkles;

  navLinks = [
    { name: 'Home', href: '/home', isRouterLink: true },
    { name: 'Features', href: 'features', isRouterLink: false },
    { name: 'How It Works', href: 'how-it-works', isRouterLink: false },
    { name: 'Pricing', href: 'pricing', isRouterLink: false },
    { name: 'Docs', href: 'docs', isRouterLink: false }
  ];

  constructor(public authService: AuthService, private router: Router) {}

  scrollTo(sectionId: string) {
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const headerOffset = 64;
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getStarted() {
    this.router.navigate(['/register']);
  }
}