import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, Github, Twitter, Linkedin } from 'lucide-angular';
import { RouterLink } from '@angular/router';

export interface FooterLink {
  name: string;
  route: string | null;
  fragment?: string;
  href?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  readonly icons = { Sparkles, Github, Twitter, Linkedin };

  links: Record<string, FooterLink[]> = {
    Product: [
      { name: "Features", route: "/", fragment: "features" },
      { name: "Live Demo", route: "/", fragment: "live-demo" },
      { name: "Pricing", route: null },
      { name: "Changelog", route: null }
    ],
    Resources: [
      { name: "Documentation", route: "/docs" },
      { name: "Help Center", route: null },
      { name: "Safety", route: null },
      { name: "Status", route: null }
    ],
    Company: [
      { name: "About", route: null },
      { name: "Privacy", route: null },
      { name: "Terms", route: null },
      { name: "Contact", route: null }
    ],
    Developers: [
      { name: "GitHub", href: "https://github.com/RohitSalv/pixory-image-cloud-backend", route: null },
      { name: "API Docs", route: null },
      { name: "Self-Hosting", route: null },
      { name: "Contributing", route: null }
    ]
  };

  categories = ['Product', 'Resources', 'Company', 'Developers'];
}