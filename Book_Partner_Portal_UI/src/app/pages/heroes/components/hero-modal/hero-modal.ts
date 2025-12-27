import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService, Hero } from '../../../../services/hero.service';

@Component({
  selector: 'app-hero-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Full-screen backdrop fixed to viewport -->
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <!-- Modal Container -->
      <div class="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Edit Hero' : 'New Hero Section' }}</h2>
              <p class="text-xs text-slate-500 font-medium">Configure carousel banners and destinations</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Scrollable form content -->
        <form (ngSubmit)="save()" class="p-8 space-y-8 overflow-y-auto custom-scrollbar bg-white">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-1">
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Hero Title</label>
              <input 
                [(ngModel)]="formData.placeHolder" 
                name="placeHolder" 
                type="text" 
                placeholder="e.g., Epic Fantasy Series" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                required
              >
            </div>

            <div class="col-span-1">
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Destination URL</label>
              <input 
                [(ngModel)]="formData.clickUrl" 
                name="clickUrl" 
                type="text" 
                placeholder="e.g., /catalog/fantasy" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                required
              >
            </div>
          </div>

          <!-- Hero Images Selection -->
          <div class="space-y-4">
            <div class="flex items-center justify-between px-1">
              <div>
                <label class="block text-sm font-bold text-slate-700">Carousel Images</label>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Add high-quality banner URLs</p>
              </div>
              <button 
                type="button" 
                (click)="addImage()"
                class="h-9 px-4 bg-indigo-50 text-indigo-600 text-xs font-black rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                ADD URL
              </button>
            </div>
            
            <div class="space-y-3">
              <div *ngFor="let url of formData.heroImages; let i = index; trackBy: trackByIndex" class="flex gap-3 group animate-slide-in">
                <div class="flex-1 relative">
                  <input 
                    [(ngModel)]="formData.heroImages[i]" 
                    [name]="'image' + i" 
                    type="text" 
                    placeholder="https://..." 
                    class="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-indigo-400 bg-slate-50/30 outline-none transition-all pr-14 text-xs font-mono"
                  >
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-10 rounded-lg bg-white border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
                     <img *ngIf="url" [src]="url" class="h-full w-full object-cover">
                     <svg *ngIf="!url" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                </div>
                <button 
                  (click)="removeImage(i)" 
                  type="button" 
                  class="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
              
              <div *ngIf="formData.heroImages.length === 0" class="py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2">
                 <div class="h-12 w-12 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/></svg>
                 </div>
                 <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">No images defined yet</p>
              </div>
            </div>
          </div>
        </form>

        <!-- Footer -->
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
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Section' : 'Publish Section') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scale-in { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
    @keyframes slide-in { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .animate-fade-in { animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
  `]
})
export class HeroModal {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set hero(value: Hero | null) {
    if (value) {
      this.formData = { ...value, heroImages: [...(value.heroImages || [])] };
    } else {
      this.formData = { placeHolder: '', clickUrl: '', heroImages: [] };
    }
  }
  @Output() onSave = new EventEmitter<Hero>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    placeHolder: '',
    clickUrl: '',
    heroImages: []
  };
  loading: boolean = false;

  constructor(private heroService: HeroService) {}

  trackByIndex(index: number): number {
    return index;
  }

  addImage() {
    this.formData.heroImages.push('');
  }

  removeImage(index: number) {
    this.formData.heroImages.splice(index, 1);
  }

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
      next: (savedHero: Hero) => {
        this.onSave.emit(savedHero);
        this.loading = false;
        this.close();
      },
      error: (err: any) => {
        alert('Error saving hero section: ' + (err.message || 'Server connection failed'));
        this.loading = false;
      }
    };

    if (this.isEdit) {
      this.heroService.updateHero(this.formData.id, this.formData).subscribe(observer);
    } else {
      this.heroService.createHero(this.formData).subscribe(observer);
    }
  }
}
