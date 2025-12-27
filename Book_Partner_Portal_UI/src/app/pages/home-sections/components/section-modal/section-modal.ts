import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService, HomeSection } from '../../../../services/home.service';
import { CustomDropdown, DropdownOption } from '../../../../components/custom-dropdown/custom-dropdown';

@Component({
  selector: 'app-section-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDropdown],
  template: `
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <div class="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Modify Interface Unit' : 'Initialize Home Section' }}</h2>
              <p class="text-xs text-slate-500 font-medium tracking-tight">Coordinate front-facing layout modules</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form (ngSubmit)="save()" class="p-8 space-y-8 overflow-y-auto custom-scrollbar bg-white">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Section Descriptor</label>
              <input 
                [(ngModel)]="formData.sectionName" 
                name="sectionName" 
                type="text" 
                placeholder="e.g., Seasonal Best-Sellers" 
                class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800"
                required
              >
            </div>

            <app-custom-dropdown
              label="Interface Blueprint (Type)"
              [options]="typeOptions"
              [(value)]="formData.sectionType"
              [disabled]="isEdit"
              placeholder="Module logic"
            ></app-custom-dropdown>
          </div>

          <!-- Dynamic Content Selection -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-3">
              <div class="h-1 w-4 bg-indigo-500 rounded-full"></div>
              <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] tracking-tight">Asset Synchronization</h3>
            </div>
            
            <div class="bg-slate-50/80 p-6 rounded-[2rem] border-2 border-slate-100 ring-4 ring-slate-50/50">
               <!-- HERO/BANNER TYPE -->
               <div *ngIf="isBannerOrHero" class="animate-fade-in">
                  <app-custom-dropdown
                    *ngIf="formData.sectionType === 'Hero'"
                    label="Select Hero Sequences"
                    [options]="heroOptions"
                    [(value)]="formData.heros"
                    [isMultiSelect]="true"
                    placeholder="Link carousel assets"
                  ></app-custom-dropdown>

                  <app-custom-dropdown
                    *ngIf="formData.sectionType !== 'Hero'"
                    label="Select Billboard Assets"
                    [options]="bannerOptions"
                    [(value)]="formData.banners"
                    [isMultiSelect]="true"
                    placeholder="Link display banners"
                  ></app-custom-dropdown>
               </div>

               <!-- BOOK TYPE -->
               <div *ngIf="formData.sectionType === 'Book'" class="animate-fade-in">
                  <app-custom-dropdown
                    label="Select Catalog Entities"
                    [options]="bookOptions"
                    [(value)]="formData.books"
                    [isMultiSelect]="true"
                    placeholder="Search catalog titles"
                  ></app-custom-dropdown>
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
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Unit' : 'Publish Unit') }}
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
export class SectionModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set section(value: HomeSection | null) {
    if (value) {
      this.formData = { 
        ...value, 
        books: [...(value.books || [])],
        banners: [...(value.banners || [])],
        heros: [...(value.heros || [])]
      };
    } else {
      this.formData = { sectionName: '', sectionType: 'Book', books: [], banners: [], heros: [] };
    }
  }
  @Output() onSave = new EventEmitter<HomeSection>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {
    sectionName: '',
    sectionType: 'Book',
    books: [],
    banners: [],
    heros: []
  };
  loading: boolean = false;

  // Options
  typeOptions: DropdownOption[] = [
    { value: 'Hero', label: 'Hero Carousel' },
    { value: 'Book', label: 'Book Collection' },
    { value: 'SmallBanner', label: 'Small Billboard' },
    { value: 'MediumBanner', label: 'Medium Billboard' },
    { value: 'LargeBanner', label: 'Large Billboard' }
  ];

  bookOptions: DropdownOption[] = [];
  bannerOptions: DropdownOption[] = [];
  heroOptions: DropdownOption[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadAllOptions();
  }

  loadAllOptions() {
    this.homeService.fetchAvailableBooks().subscribe(books => {
      this.bookOptions = books.map(b => ({
        value: b.id,
        label: b.title,
        subLabel: b.authorName,
        image: b.images?.[0]
      }));
    });

    this.homeService.fetchAvailableBanners().subscribe(banners => {
      this.bannerOptions = banners.map(b => ({
        value: b.id,
        label: b.placeHolder || 'Unnamed Banner',
        subLabel: b.clickUrl,
        image: b.bannerImage
      }));
    });

    this.homeService.fetchAvailableHeros().subscribe(heros => {
      this.heroOptions = heros.map(h => ({
        value: h.id,
        label: h.placeHolder || 'Unnamed Hero',
        subLabel: h.clickUrl,
        image: h.heroImages?.[0]
      }));
    });
  }

  get isBannerOrHero() {
    return ['Hero', 'SmallBanner', 'MediumBanner', 'LargeBanner'].includes(this.formData.sectionType);
  }

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
        next: (savedSection: HomeSection) => {
          this.onSave.emit(savedSection);
          this.loading = false;
          this.close();
        },
        error: (err: any) => {
          alert('Error saving section: ' + err.message);
          this.loading = false;
        }
    };

    if (this.isEdit) {
      this.homeService.updateSection(this.formData.id, this.formData).subscribe(observer);
    } else {
      this.createSection().subscribe(observer);
    }
  }

  private createSection() {
    switch (this.formData.sectionType) {
      case 'Hero': return this.homeService.createHeroSection(this.formData);
      case 'Book': return this.homeService.createBookSection(this.formData);
      case 'SmallBanner': return this.homeService.createSmallBannerSection(this.formData);
      case 'MediumBanner': return this.homeService.createMediumBannerSection(this.formData);
      case 'LargeBanner': return this.homeService.createLargeBannerSection(this.formData);
      default: return this.homeService.createBookSection(this.formData);
    }
  }
}
