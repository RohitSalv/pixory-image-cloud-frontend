import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, Heart, Code, Camera, Users } from 'lucide-angular';

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './use-cases.html',
  animations: [
    trigger('tabChange', [
      transition(':enter, * => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class UseCases {
  activeTab = 0;

  tabs = [
    {
      icon: Heart,
      label: "Personal Memories",
      title: "Relive Your Life's Moments",
      description: "Search your entire photo library by memory, not metadata. Find that birthday party, that trip to the mountains, or that perfect sunset—all with natural language.",
      examples: [
        "Find all photos with my kids at the beach",
        "Show me pictures from last year's vacation",
        "Photos of my cat sleeping in funny positions"
      ]
    },
    {
      icon: Code,
      label: "Developers",
      title: "Built for Technical Users",
      description: "Full API access, self-hosting options, and open architecture. Integrate Pixory into your workflow with complete control over your data.",
      examples: [
        "RESTful API with comprehensive documentation",
        "Self-host on your own infrastructure",
        "Export and backup with standard formats"
      ]
    },
    {
      icon: Camera,
      label: "Creators",
      title: "Organize Your Creative Work",
      description: "Manage thousands of RAW files, stock photos, and client work. Find the perfect shot from your archive in seconds with AI-powered search.",
      examples: [
        "Search by composition and lighting style",
        "Find similar shots across projects",
        "Auto-tag and organize client galleries"
      ]
    },
    {
      icon: Users,
      label: "Families",
      title: "Share Memories Safely",
      description: "Create shared family albums with granular privacy controls. Everyone can contribute and search, all while keeping your data secure.",
      examples: [
        "Private family photo sharing",
        "Automatic face recognition for family members",
        "Collaborative album creation"
      ]
    }
  ];

  get activeUseCase() {
    return this.tabs[this.activeTab];
  }
}