import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridList } from '../grid-list/grid-list';
import { Header } from '../landingpage/header/header';
import { LucideAngularModule, Sparkles, Image, Zap } from 'lucide-angular';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GridList, Header, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly icons = { Sparkles, Image, Zap };
}
