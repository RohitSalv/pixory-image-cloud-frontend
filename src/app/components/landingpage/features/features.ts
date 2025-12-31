import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { LucideAngularModule, Brain, Search, Sparkles, Cloud } from 'lucide-angular';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './features.html',
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Features {
  features = [
    {
      icon: Brain,
      title: "AI Image Understanding",
      description: "Advanced computer vision analyzes every photo, identifying objects, scenes, people, and context automatically.",
      gradient: "from-blue-500/10 to-blue-500/5"
    },
    {
      icon: Search,
      title: "Smart Semantic Search",
      description: "Search your photos by what's in them, not what you named them. Find 'sunset beach' or 'birthday cake' instantly.",
      gradient: "from-violet-500/10 to-violet-500/5"
    },
    {
      icon: Sparkles,
      title: "Auto-Generated Albums",
      description: "Pixory automatically organizes photos into intelligent albums based on content, people, and events.",
      gradient: "from-blue-500/10 to-blue-500/5"
    },
    {
      icon: Cloud,
      title: "Private Cloud Storage",
      description: "Your photos stay yours. End-to-end encrypted storage with no data mining, no ads, just pure privacy.",
      gradient: "from-violet-500/10 to-violet-500/5"
    }
  ];
}