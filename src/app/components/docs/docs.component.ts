import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../landingpage/header/header';
import { Footer } from '../landingpage/footer/footer';
import { LucideAngularModule, Book, Shield, UploadCloud, Search, User, Zap, ChevronRight, Menu, FileText, Lock, Globe, X } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, Header, Footer, LucideAngularModule, RouterLink],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css'
})
export class DocsComponent {
  activeSection = 'introduction';
  isMobileMenuOpen = false;

  readonly icons = { Book, Shield, UploadCloud, Search, User, Zap, ChevronRight, Menu, FileText, Lock, Globe, X };

  sections = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'uploading', title: 'Uploading & storage', icon: UploadCloud },
    { id: 'search', title: 'Smart Search', icon: Search },
    { id: 'security', title: 'Security & Privacy', icon: Shield },
    { id: 'account', title: 'Account Management', icon: User },
  ];

  scrollTo(sectionId: string) {
    this.activeSection = sectionId;
    this.isMobileMenuOpen = false;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
