import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html'
})
export class HowItWorks {
  steps = [
    {
      number: "01",
      title: "Upload Your Photos",
      description: "Securely upload photos to your private Pixory cloud or use local processing.",
      color: "blue"
    },
    {
      number: "02",
      title: "AI Analyzes Content",
      description: "Advanced vision models extract meaning, objects, scenes, and context from each image.",
      color: "violet"
    },
    {
      number: "03",
      title: "Embeddings Generated",
      description: "Images are converted to semantic vectors and stored in a searchable index.",
      color: "blue"
    },
    {
      number: "04",
      title: "Search & Discover",
      description: "Use natural language to find any photo by meaning, not metadata.",
      color: "violet"
    }
  ];
}