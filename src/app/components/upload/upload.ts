import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { ToastService } from '../../services/toast.service';
import { LucideAngularModule, UploadCloud, ImageIcon, Loader2, X, FileUp, Shield, Zap, Sparkles, Globe } from 'lucide-angular';
import { Header } from "../landingpage/header/header";
import { Footer } from '../landingpage/footer/footer';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Header, Footer],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile: File | null = null;
  fileName: string = '';
  previewUrl: string | null = null;
  uploading = false;
  isDragging = false;

  readonly icons = { UploadCloud, ImageIcon, Loader2, X, FileUp, Shield, Zap, Sparkles, Globe };

  constructor(
    private fileUploadService: FileUploadService,
    private toastService: ToastService
  ) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.toastService.error('Please select an image file');
      return;
    }

    // Optional: Check file size (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.toastService.error('File size exceeds 5MB limit');
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeFile() {
    this.selectedFile = null;
    this.fileName = '';
    this.previewUrl = null;
  }

  uploadFile() {
    if (!this.selectedFile || this.uploading) return;
    this.uploading = true;

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.toastService.success('File uploaded successfully');
        this.reset();
      },
      error: (err) => {
        console.error(err);
        this.uploading = false;
        this.toastService.error('File upload failed. Please try again.');
      }
    });
  }

  private reset() {
    this.removeFile();
  }
}