import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrivalService } from '../../services/retrivals/retrival-service';
import { LucideAngularModule, Download, Trash2, Calendar, FileText, Tag } from 'lucide-angular';
import { Footer } from "../landingpage/footer/footer";

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Footer],
  templateUrl: './grid-list.html',
  styleUrl: './grid-list.css'
})
export class GridList implements OnInit {
  files: any[] = [];
  readonly icons = { Download, Trash2, Calendar, FileText, Tag };

  constructor(private retrivalService: RetrivalService) { }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.retrivalService.getAllFiles().subscribe(data => {
      this.files = data || [];
    });
  }

  download(id: number) {
    window.open(`http://localhost:8092/api/v1/files/download/${id}`, '_blank');
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this file?')) {
      this.retrivalService.deleteFile(id).subscribe({
        next: () => {
          this.files = this.files.filter(f => f.id !== id);
        },
        error: () => alert('Failed to delete file')
      });
    }
  }
}