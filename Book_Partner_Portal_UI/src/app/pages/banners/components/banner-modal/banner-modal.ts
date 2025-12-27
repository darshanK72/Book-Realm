import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerService, Banner } from '../../../../services/banner.service';

@Component({
  selector: 'app-banner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <div class="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Edit Banner' : 'New Billboard Asset' }}</h2>
              <p class="text-xs text-slate-500 font-medium">Configure promotional display modules</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form (ngSubmit)="save()" class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-white">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Asset Label</label>
              <input 
                [(ngModel)]="formData.placeHolder" 
                name="placeHolder" 
                type="text" 
                placeholder="e.g., Winter Clearance" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Redirect URI</label>
              <input 
                [(ngModel)]="formData.clickUrl" 
                name="clickUrl" 
                type="text" 
                placeholder="e.g., /promos/winter" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800"
                required
              >
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Display Tier (Type)</label>
              <select 
                [(ngModel)]="formData.bannerType" 
                name="bannerType"
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800 appearance-none"
              >
                <option value="SMALL">Small Billboard</option>
                <option value="MEDIUM">Medium Billboard</option>
                <option value="LARGE">Large Billboard</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Sequence Order</label>
              <input 
                [(ngModel)]="formData.order" 
                name="order" 
                type="number" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800"
                required
              >
            </div>
          </div>

          <div>
             <label class="block text-sm font-bold text-slate-700 mb-2 ml-1 border-l-4 border-indigo-500 pl-3">Asset URI (Banner Image)</label>
             <div class="mt-2 relative group">
                <input 
                  [(ngModel)]="formData.bannerImage" 
                  name="bannerImage" 
                  type="text" 
                  placeholder="https://cdn.assets.io/..." 
                  class="w-full px-5 py-3 rounded-2xl border-2 border-slate-50 focus:border-indigo-400 bg-slate-50/30 outline-none transition-all text-xs font-mono pr-20"
                >
                <div class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-14 rounded-lg bg-white border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
                   <img *ngIf="formData.bannerImage" [src]="formData.bannerImage" class="h-full w-full object-cover">
                   <svg *ngIf="!formData.bannerImage" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
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
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Billboard' : 'Publish Billboard') }}
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
export class BannerModal {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set banner(value: Banner | null) {
    if (value) {
      this.formData = { ...value };
    } else {
      this.formData = { placeHolder: '', clickUrl: '', bannerType: 'SMALL', bannerImage: '', order: 0 };
    }
  }
  @Output() onSave = new EventEmitter<Banner>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    placeHolder: '',
    clickUrl: '',
    bannerType: 'SMALL',
    bannerImage: '',
    order: 0
  };
  loading: boolean = false;

  constructor(private bannerService: BannerService) {}

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
        next: (savedBanner: Banner) => {
          this.onSave.emit(savedBanner);
          this.loading = false;
          this.close();
        },
        error: (err: any) => {
          alert('Error saving banner: ' + err.message);
          this.loading = false;
        }
    };

    if (this.isEdit) {
      this.bannerService.updateBanner(this.formData.id, this.formData).subscribe(observer);
    } else {
      const type = this.formData.bannerType;
      if (type === 'SMALL') this.bannerService.createSmallBanner(this.formData).subscribe(observer);
      else if (type === 'MEDIUM') this.bannerService.createMediumBanner(this.formData).subscribe(observer);
      else this.bannerService.createLargeBanner(this.formData).subscribe(observer);
    }
  }
}
