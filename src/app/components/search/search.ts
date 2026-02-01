import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search as SearchIcon, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Loader2, Filter, Clock, X, Sparkles, Image, Tag } from 'lucide-angular';
import { Header } from '../landingpage/header/header';
import { Footer } from '../landingpage/footer/footer';
import { SearchService } from '../../services/search.service';
import { ToastService } from '../../services/toast.service';

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
export class Search implements OnInit {
  readonly icons = {
    Search: SearchIcon,
    ArrowUp,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Filter,
    Clock,
    X,
    Sparkles,
    Image,
    Tag
  };

  searchQuery: string = '';
  page: number = 0;
  size: number = 12; // Increased size for better grid view
  sort: string = 'id';
  sortOrder: 'asc' | 'desc' = 'desc'; // Default to newest
  searchResults: any[] = [];
  searched: boolean = false;
  isLoading: boolean = false;
  recentSearches: string[] = [];

  constructor(
    private searchService: SearchService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadRecentSearches();
  }

  loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      this.recentSearches = JSON.parse(saved);
    }
  }

  saveRecentSearch(query: string) {
    if (!query) return;
    // Remove if exists to push to top
    this.recentSearches = this.recentSearches.filter(q => q !== query);
    this.recentSearches.unshift(query);
    // Keep max 5
    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  removeRecentSearch(query: string, event: Event) {
    event.stopPropagation();
    this.recentSearches = this.recentSearches.filter(q => q !== query);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  clearRecentSearches() {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }

  applySearch(query: string) {
    this.searchQuery = query;
    this.onSearch();
  }

  clearSearch() {
    this.searchQuery = '';
    this.searched = false;
    this.searchResults = [];
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      // If empty, reset
      this.searchResults = [];
      this.searched = false;
      return;
    }

    this.isLoading = true;
    this.searched = true;
    this.saveRecentSearch(this.searchQuery);

    const sortParam = `${this.sort},${this.sortOrder}`;

    this.searchService
      .searchFiles(this.searchQuery, this.page, this.size, sortParam)
      .subscribe({
        next: (response) => {
          this.searchResults = response.content;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.searchResults = [];
          this.isLoading = false;
          this.toastService.error('Search failed. Please try again.');
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
