import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Shield, Lock, Eye, Database } from 'lucide-angular';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './privacy.html'
})
export class Privacy {
  privacyFeatures = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Your photos are encrypted before they leave your device. We can't see them, and neither can anyone else."
    },
    {
      icon: Lock,
      title: "You Own Your Data",
      description: "No data mining, no selling to advertisers. Your photos belong to you, period."
    },
    {
      icon: Eye,
      title: "Private by Design",
      description: "AI analysis happens in your private cloud or locally. Your images never train our models."
    },
    {
      icon: Database,
      title: "Export Anytime",
      description: "Full data portability. Export everything in standard formats whenever you want."
    }
  ];
}