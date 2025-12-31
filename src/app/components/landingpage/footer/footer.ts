import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, Github, Twitter, Linkedin } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.html'
})
export class Footer {
  readonly icons = { Sparkles, Github, Twitter, Linkedin };

  links = {
    Product: ["Features", "Pricing", "API", "Changelog"],
    Resources: ["Documentation", "Blog", "Support", "Status"],
    Company: ["About", "Privacy", "Terms", "Contact"],
    Developers: ["GitHub", "API Docs", "Self-Hosting", "Contributing"]
  };

  // Helper for Angular's *ngFor to iterate over object keys
  get categories() {
    return Object.keys(this.links) as Array<keyof typeof this.links>;
  }
}