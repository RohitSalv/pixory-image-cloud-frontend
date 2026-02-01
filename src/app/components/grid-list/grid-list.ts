import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrievalService } from '../../services/retrieval.service';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule, Download, Trash2, Calendar, FileText, Tag, Loader2, Sparkles, Image, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-angular';
import { Footer } from "../landingpage/footer/footer";
import { environment } from '@environments/environment';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Footer],
  templateUrl: './grid-list.html',
  styleUrl: './grid-list.css'
})
export class GridList implements OnInit {
  allFiles: any[] = [];
  displayedFiles: any[] = [];
  isLoading = true;

  // Pagination & Sorting
  page = 0;
  pageSize = 12;
  sortBy: 'date' | 'name' = 'date';
  sortOrder: 'asc' | 'desc' = 'desc';

  readonly icons = { Download, Trash2, Calendar, FileText, Tag, Loader2, Sparkles, Image, ChevronLeft, ChevronRight, ArrowUp, ArrowDown };

  constructor(
    private retrievalService: RetrievalService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.isLoading = true;
    this.retrievalService.getAllFiles().subscribe({
      next: (data: any) => {
        // Inspect response structure
        console.log('API Response:', data);

        let validData: any[] = [];

        if (Array.isArray(data)) {
          // Direct array
          validData = data;
        } else if (data && Array.isArray(data.content)) {
          // Spring Page
          validData = data.content;
        } else if (data && Array.isArray(data.data)) {
          // Wrapped { data: [...] }
          validData = data.data;
        }

        this.allFiles = validData;

        if (this.allFiles.length === 0) {
          console.warn('Parsed files array is empty. Raw data:', data);
        }

        this.updateView();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('File load error:', err);
        this.isLoading = false;
        this.toastService.error('Failed to load files');
      }
    });
  }

  updateView() {
    // 1. Sort
    let sorted = [...this.allFiles].sort((a, b) => {
      let comparison = 0;
      if (this.sortBy === 'date') {
        const tA = this.parseDate(a.uploadTime);
        const tB = this.parseDate(b.uploadTime);
        comparison = tA - tB;
      } else {
        const nameA = a.fileName || '';
        const nameB = b.fileName || '';
        comparison = nameA.localeCompare(nameB);
      }
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    // 2. Paginate
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.displayedFiles = sorted.slice(start, end);
  }

  private parseDate(dateInput: any): number {
    if (!dateInput) return 0;

    // Handle Java LocalDateTime array: [2024, 2, 28, 14, 30, ...]
    if (Array.isArray(dateInput)) {
      // Construct Date from parts. Note: Month is 0-indexed in JS Date, but usually 1-indexed in JSON arrays from Java
      const y = dateInput[0] || 0;
      const m = (dateInput[1] || 1) - 1; // Adjust month
      const d = dateInput[2] || 1;
      const h = dateInput[3] || 0;
      const min = dateInput[4] || 0;
      const s = dateInput[5] || 0;
      return new Date(y, m, d, h, min, s).getTime();
    }

    // Handle standard string/number
    const parsed = new Date(dateInput).getTime();
    return isNaN(parsed) ? 0 : parsed;
  }

  nextPage() {
    if ((this.page + 1) * this.pageSize < this.allFiles.length) {
      this.page++;
      this.updateView();
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.updateView();
      this.scrollToTop();
    }
  }

  toggleSort(field: 'date' | 'name') {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'desc'; // Default new sort to desc
    }
    this.page = 0; // Reset to first page
    this.updateView();
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  download(id: number) {
    window.open(`${environment.filesApiUrl}/download/${id}`, '_blank');
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this file?')) {
      this.retrievalService.deleteFile(id).subscribe({
        next: () => {
          this.allFiles = this.allFiles.filter(f => f.id !== id);
          this.updateView(); // Re-calculate view
          this.toastService.success('File deleted successfully');
        },
        error: () => this.toastService.error('Failed to delete file')
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.allFiles.length / this.pageSize);
  }
}