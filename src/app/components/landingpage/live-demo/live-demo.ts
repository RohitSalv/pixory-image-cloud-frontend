import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload, Sparkles, Search, Check } from 'lucide-angular';

@Component({
  selector: 'app-live-demo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './live-demo.html'
})
export class LiveDemo {
  steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Drag & drop or select photos",
      color: "blue"
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Instant description generation",
      color: "violet"
    },
    {
      icon: Search,
      title: "Search by Description",
      description: "Find by meaning, not filename",
      color: "blue"
    },
    {
      icon: Check,
      title: "Instant Results",
      description: "Get your memories back",
      color: "violet"
    }
  ];
}