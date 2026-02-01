import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService, Toast } from '../../../services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { LucideAngularModule, X, CheckCircle, AlertCircle, Info } from 'lucide-angular';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div *ngFor="let toast of toasts$ | async" 
           [@toastAnimation] 
           class="pointer-events-auto flex items-center p-4 mb-2 rounded-lg shadow-lg min-w-[300px] backdrop-blur-md border transition-all"
           [ngClass]="{
             'bg-green-100/90 border-green-200 text-green-800': toast.type === 'success',
             'bg-red-100/90 border-red-200 text-red-800': toast.type === 'error',
             'bg-blue-100/90 border-blue-200 text-blue-800': toast.type === 'info'
           }">
        
        <div class="mr-3">
          <lucide-icon [name]="toast.type === 'success' ? icons.CheckCircle : (toast.type === 'error' ? icons.AlertCircle : icons.Info)" 
                       class="w-5 h-5"></lucide-icon>
        </div>
        
        <div class="flex-1 text-sm font-medium">
          {{ toast.message }}
        </div>

        <button (click)="remove(toast.id)" class="ml-3 text-current opacity-70 hover:opacity-100 transition-opacity">
          <lucide-icon [name]="icons.X" class="w-4 h-4"></lucide-icon>
        </button>
      </div>
    </div>
  `,
    animations: [
        trigger('toastAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
                animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }))
            ])
        ])
    ]
})
export class ToastComponent {
    readonly icons = { X, CheckCircle, AlertCircle, Info };
    toasts$: Observable<Toast[]>;

    constructor(public toastService: ToastService) {
        this.toasts$ = this.toastService.toasts$;
    }

    remove(id: number) {
        this.toastService.remove(id);
    }
}
