import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../services/file-upload-service';
import { UploadService } from '../../services/uploader/upload-service';
import { LucideAngularModule, UploadCloud, ImageIcon, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile: File | null = null;
  fileName: string = '';
  previewUrl: string | null = null;
  uploading = false;

  readonly icons = { UploadCloud, ImageIcon, Loader2 };

  constructor(
    private fileUploadService: FileUploadService,
    private uploadService: UploadService
  ) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    this.selectedFile = input.files[0];
    this.fileName = this.selectedFile.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile() {
    if (!this.selectedFile || this.uploading) return;
    this.uploading = true;

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        alert('File uploaded successfully');
        this.reset();
      },
      error: (err) => {
        console.error(err);
        this.uploading = false;
        alert('File upload failed');
      }
    });
  }

  private reset() {
    this.selectedFile = null;
    this.fileName = '';
    this.previewUrl = null;
  }
}