import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, Sparkles, Menu, X } from 'lucide-angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
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
    ]),
    trigger('slideToggle', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class Header implements OnDestroy {

  readonly SparklesIcon = Sparkles;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  isMenuOpen = false;

  navLinks: { name: string; href: string; isRouterLink: boolean }[] = [];
  private authSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {
    this.updateNavLinks();
    this.authSubscription = this.authService.isAuthenticated$.subscribe(() => {
      this.updateNavLinks();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  updateNavLinks() {
    if (this.authService.isAuthenticated()) {
      this.navLinks = [
        { name: 'Explore', href: '/explore', isRouterLink: true },
        { name: 'Search', href: '/search', isRouterLink: true },
        { name: 'Upload', href: '/upload', isRouterLink: true },
        { name: 'Docs', href: '/docs', isRouterLink: true }
      ];
    } else {
      this.navLinks = [
        { name: 'Home', href: '/home', isRouterLink: true },
        { name: 'Features', href: 'features', isRouterLink: false },
        { name: 'How It Works', href: 'how-it-works', isRouterLink: false },
        { name: 'Docs', href: '/docs', isRouterLink: true }
      ];
    }
  }

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getStarted() {
    this.router.navigate(['/register']);
  }
}
