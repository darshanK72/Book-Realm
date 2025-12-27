import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubgenreService, Subgenre } from '../../../../services/subgenre.service';
import { GenreService } from '../../../../services/genre.service';
import { CustomDropdown, DropdownOption } from '../../../../components/custom-dropdown/custom-dropdown';

@Component({
  selector: 'app-subgenre-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDropdown],
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
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 12-5 5-5-5"/><path d="m17 7-5 5-5-5"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Edit Subtype' : 'New Subtype Entry' }}</h2>
              <p class="text-xs text-slate-500 font-medium">Refine classification granularity</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form (ngSubmit)="save()" class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-white">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Subcategory Label</label>
              <input 
                [(ngModel)]="formData.name" 
                name="name" 
                type="text" 
                placeholder="e.g., Cyberpunk, Hard-boiled Mystery" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                required
              >
            </div>

            <app-custom-dropdown
              label="Parent Definition (Genre)"
              [options]="genreOptions"
              [(value)]="formData.genreId"
              placeholder="Assign to primary genre"
            ></app-custom-dropdown>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Contextual Description</label>
              <textarea 
                [(ngModel)]="formData.description" 
                name="description" 
                rows="4"
                placeholder="Elaborate on the specific traits of this sub-classification..." 
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
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Subtype' : 'Publish Subtype') }}
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
export class SubgenreModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set subgenre(value: Subgenre | null) {
    if (value) {
      this.formData = { ...value };
    } else {
      this.formData = { name: '', description: '', genreId: '' };
    }
  }
  @Output() onSave = new EventEmitter<Subgenre>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    name: '',
    description: '',
    genreId: ''
  };
  loading: boolean = false;
  genreOptions: DropdownOption[] = [];

  constructor(
    private subgenreService: SubgenreService,
    private genreService: GenreService
  ) {}

  ngOnInit() {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getGenres().subscribe(genres => {
      this.genreOptions = genres.map(g => ({ value: g.id, label: g.name }));
    });
  }

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
      next: (savedSubgenre: Subgenre) => {
        this.onSave.emit(savedSubgenre);
        this.loading = false;
        this.close();
      },
      error: (err: any) => {
        alert('Error saving subgenre: ' + err.message);
        this.loading = false;
      }
    };

    if (this.isEdit) {
      this.subgenreService.updateSubgenre(this.formData.id, this.formData).subscribe(observer);
    } else {
      this.subgenreService.createSubgenre(this.formData).subscribe(observer);
    }
  }
}
