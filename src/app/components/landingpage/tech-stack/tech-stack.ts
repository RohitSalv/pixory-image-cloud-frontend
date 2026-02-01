import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Database, Brain, Search, Cloud, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tech-stack.html'
})
export class TechStack {
  stack = [
    {
      icon: Brain,
      label: "AI Core",
      tech: "ML Powered"
    },
    {
      icon: Search,
      label: "Smart Search",
      tech: "Semantic"
    },
    {
      icon: Database,
      label: "Storage",
      tech: "Cloud Native"
    },
    {
      icon: Sparkles, // Using Sparkles for the modern frontend
      label: "Angular 20",
      tech: "Signals Architecture"
    },
    {
      icon: Cloud,
      label: "Tailwind 4",
      tech: "High-Performance CSS"
    }
  ];
}