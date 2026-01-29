import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { icons, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { Header } from '../landingpage/header/header';
import { Footer } from '../landingpage/footer/footer';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    Header,
    Footer
  ],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  icons = { ArrowUp, ArrowDown, ChevronLeft, ChevronRight }; // Make lucide icons available in the template

  searchQuery: string = '';
  page: number = 0;
  size: number = 10;
  sort: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchResults: any[] = [];
  searched: boolean = false;

  constructor(private searchService: SearchService) { }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      this.searched = true; // Indicate that a search was attempted, but no query
      return;
    }

    const sortParam = `${this.sort},${this.sortOrder}`;

    this.searchService
      .searchFiles(this.searchQuery, this.page, this.size, sortParam)
      .subscribe({
        next: (response) => {
          this.searchResults = response.content; // Assuming the API returns a paginated response with a 'content' array
          this.searched = true;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.searchResults = [];
          this.searched = true;
          // Handle error, e.g., show an alert to the user
        },
      });
  }

  incrementPage(): void {
    this.page++;
    this.onSearch();
  }

  decrementPage(): void {
    if (this.page > 0) {
      this.page--;
      this.onSearch();
    }
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }
}
