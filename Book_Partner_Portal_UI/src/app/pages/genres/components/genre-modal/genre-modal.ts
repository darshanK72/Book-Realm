import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenreService, Genre } from '../../../../services/genre.service';

@Component({
  selector: 'app-genre-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <div class="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Edit Genre' : 'New Genre Definition' }}</h2>
              <p class="text-xs text-slate-500 font-medium tracking-tight">Standardize asset classification</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form (ngSubmit)="save()" class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-white">
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Genre Label</label>
              <input 
                [(ngModel)]="formData.name" 
                name="name" 
                type="text" 
                placeholder="e.g., Epic Fantasy, Dark Mystery" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Institutional Description</label>
              <textarea 
                [(ngModel)]="formData.description" 
                name="description" 
                rows="4"
                placeholder="Define the scope and characteristics of this classification..." 
                class="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all resize-none font-medium text-slate-600 shadow-sm"
              ></textarea>
            </div>
          </div>
        </form>

        <div class="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
          <button 
            type="button" 
            (click)="close()" 
            class="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            DISCARD
          </button>
          <button 
            (click)="save()"
            type="submit" 
            [disabled]="loading"
            class="px-10 py-3 bg-indigo-600 text-white rounded-[1.25rem] hover:bg-indigo-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/30 disabled:opacity-50 flex items-center gap-3 active:scale-95"
          >
            <div *ngIf="loading" class="h-4 w-4 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Definition' : 'Publish Definition') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scale-in { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
    .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `]
})
export class GenreModal {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set genre(value: Genre | null) {
    if (value) {
      this.formData = { ...value };
    } else {
      this.formData = { name: '', description: '', subgenres: [] };
    }
  }
  @Output() onSave = new EventEmitter<Genre>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    name: '',
    description: '',
    subgenres: []
  };
  loading: boolean = false;

  constructor(private genreService: GenreService) {}

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
      next: (savedGenre: Genre) => {
        this.onSave.emit(savedGenre);
        this.loading = false;
        this.close();
      },
      error: (err: any) => {
        alert('Error saving genre: ' + err.message);
        this.loading = false;
      }
    };

    if (this.isEdit) {
      this.genreService.updateGenre(this.formData.id, this.formData).subscribe(observer);
    } else {
      this.genreService.createGenre(this.formData).subscribe(observer);
    }
  }
}
