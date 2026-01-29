import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridList } from '../grid-list/grid-list';
import { Header } from '../landingpage/header/header';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GridList, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
