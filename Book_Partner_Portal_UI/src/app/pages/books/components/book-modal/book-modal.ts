import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService, Book } from '../../../../services/book.service';
import { CustomDropdown, DropdownOption } from '../../../../components/custom-dropdown/custom-dropdown';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDropdown],
  template: `
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in"
      (click)="$event.target === modalContainer && close()" #modalContainer
    >
      <div class="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in border border-white/20">
        <!-- Header -->
        <div class="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ isEdit ? 'Edit Catalog Entry' : 'New Catalog Listing' }}</h2>
              <p class="text-xs text-slate-500 font-medium">Identify and categorize book assets</p>
            </div>
          </div>
          <button (click)="close()" class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Content -->
        <form (ngSubmit)="save()" class="flex-1 overflow-y-auto custom-scrollbar p-8 bg-white space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Information Grid -->
            <div class="lg:col-span-2 space-y-8">
              <section class="space-y-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="h-1 w-4 bg-indigo-500 rounded-full"></div>
                  <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Core Identity</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Asset Title</label>
                    <input [(ngModel)]="formData.title" name="title" type="text" placeholder="Enter formal book title" class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800" required>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Author / Creator</label>
                    <input [(ngModel)]="formData.authorName" name="authorName" type="text" placeholder="Primary author name" class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-medium text-slate-800">
                  </div>
                </div>
              </section>

              <section class="space-y-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="h-1 w-4 bg-indigo-500 rounded-full"></div>
                  <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Categorization</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <app-custom-dropdown label="Primary Genre" [options]="genreOptions" [(value)]="formData.genreId" placeholder="Major category"></app-custom-dropdown>
                  <app-custom-dropdown label="Focus Subgenre" [options]="subgenreOptions" [(value)]="formData.subgenreId" placeholder="Niche category"></app-custom-dropdown>
                </div>
              </section>

              <section class="space-y-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="h-1 w-4 bg-indigo-500 rounded-full"></div>
                  <h3 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Logistics & Specification</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <app-custom-dropdown label="Format" [options]="formatOptions" [(value)]="formData.bookFormat" placeholder="Medium"></app-custom-dropdown>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Page Count</label>
                    <input [(ngModel)]="formData.pages" name="pages" type="number" class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-800">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">Language</label>
                    <input [(ngModel)]="formData.language" name="language" type="text" class="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white bg-slate-50/50 outline-none transition-all font-bold text-slate-800">
                  </div>
                </div>
              </section>
            </div>

            <!-- Sidebar form part -->
            <div class="lg:col-span-1 space-y-8 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
              <section class="space-y-5">
                 <h3 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest text-center py-2 bg-indigo-50 rounded-xl">Commercial Data</h3>
                 
                 <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Market Price ($)</label>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300">$</span>
                      <input [(ngModel)]="formData.price" name="price" type="number" step="0.01" class="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-white focus:border-indigo-400 bg-white outline-none transition-all font-black text-slate-800 shadow-sm">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Promotion %</label>
                    <div class="relative">
                       <input [(ngModel)]="formData.discountPercentage" name="discountPercentage" type="number" class="w-full px-4 py-3 rounded-2xl border-2 border-white focus:border-indigo-400 bg-white outline-none transition-all font-black text-emerald-600 shadow-sm">
                       <span class="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300">%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Quality Rating</label>
                    <input [(ngModel)]="formData.rating" name="rating" type="number" step="0.1" min="0" max="5" class="w-full px-4 py-3 rounded-2xl border-2 border-white focus:border-indigo-400 bg-white outline-none transition-all font-black text-amber-500 shadow-sm">
                  </div>
              </section>

              <section class="space-y-4">
                 <h3 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest text-center py-2 bg-indigo-50 rounded-xl">Description</h3>
                 <textarea [(ngModel)]="formData.description" name="description" rows="5" placeholder="Deep-dive into the assets narrative..." class="w-full px-5 py-4 rounded-2xl border-2 border-white focus:border-indigo-400 bg-white outline-none transition-all resize-none text-sm font-medium text-slate-600 shadow-sm"></textarea>
              </section>
            </div>

          </div>
        </form>

        <!-- Footer -->
        <div class="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
          <button type="button" (click)="close()" class="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">DISCARD</button>
          <button (click)="save()" type="submit" [disabled]="loading" class="px-12 py-3 bg-indigo-600 text-white rounded-[1.25rem] hover:bg-indigo-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/30 disabled:opacity-50 flex items-center gap-3 active:scale-95">
            <div *ngIf="loading" class="h-4 w-4 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ loading ? 'Synchronizing...' : (isEdit ? 'Update Asset' : 'Publish Asset') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scale-in { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
    .animate-fade-in { animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `]
})
export class BookModal implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() set book(value: Book | null) {
    if (value) {
      this.formData = { ...value };
    } else {
      this.resetForm();
    }
  }
  @Output() onSave = new EventEmitter<Book>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {};
  loading: boolean = false;

  // Options
  genreOptions: DropdownOption[] = [];
  subgenreOptions: DropdownOption[] = [];
  formatOptions: DropdownOption[] = [
    { value: 'Hardcover', label: 'Hardcover' },
    { value: 'Paperback', label: 'Paperback' },
    { value: 'E-book', label: 'E-book' },
    { value: 'Audiobook', label: 'Audiobook' }
  ];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadDropdownData();
  }

  resetForm() {
    this.formData = {
      title: '',
      rating: 0,
      description: '',
      publishDate: new Date().toISOString(),
      price: 0,
      discountPercentage: 0,
      pages: 0,
      bookFormat: 'Hardcover',
      language: 'English',
      country: 'USA',
      authorName: '',
      authorId: '00000000-0000-0000-0000-000000000000',
      publisherName: 'Default Publisher',
      publisherId: '00000000-0000-0000-0000-000000000000',
      genreId: '',
      subgenreId: '',
      tags: [],
      reviews: [],
      images: []
    };
  }

  loadDropdownData() {
    this.bookService.getGenres().subscribe(genres => {
      this.genreOptions = genres.map(g => ({ value: g.id, label: g.genreName }));
    });

    this.bookService.getSubgenres().subscribe(subgenres => {
      this.subgenreOptions = subgenres.map(s => ({ value: s.id, label: s.subgenreName }));
    });
  }

  close() {
    this.onClose.emit();
  }

  save() {
    this.loading = true;
    const observer = {
      next: (savedBook: Book) => {
        this.onSave.emit(savedBook);
        this.loading = false;
        this.close();
      },
      error: (err: any) => {
        alert('Error saving book: ' + err.message);
        this.loading = false;
      }
    };

    if (this.isEdit) {
      this.bookService.updateBook(this.formData.id, this.formData).subscribe(observer);
    } else {
      this.bookService.createBook(this.formData).subscribe(observer);
    }
  }
}
