import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Database, Brain, Search, Cloud } from 'lucide-angular';

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
      label: "Vision AI",
      tech: "Advanced ML"
    },
    {
      icon: Search,
      label: "Vector Search",
      tech: "Semantic Index"
    },
    {
      icon: Database,
      label: "PostgreSQL",
      tech: "Reliable Storage"
    },
    {
      icon: Cloud,
      label: "Cloud Native",
      tech: "Scalable Infrastructure"
    }
  ];
}