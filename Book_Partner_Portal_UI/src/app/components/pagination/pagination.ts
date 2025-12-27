import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/30">
      <div class="flex items-center text-sm text-slate-500 font-medium">
        Showing 
        <span class="px-1.5 font-bold text-slate-800">{{ startRange }}</span> 
        to 
        <span class="px-1.5 font-bold text-slate-800">{{ endRange }}</span> 
        of 
        <span class="px-1.5 font-bold text-slate-800">{{ totalItems }}</span> 
        results
      </div>
      
      <div class="flex items-center gap-1">
        <button 
          (click)="changePage(currentPage - 1)"
          [disabled]="currentPage === 1"
          class="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:border-transparent transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div class="flex items-center gap-1 px-2">
          <button 
            *ngFor="let page of pages"
            (click)="changePage(page)"
            [class.bg-indigo-600]="page === currentPage"
            [class.text-white]="page === currentPage"
            [class.shadow-indigo-200]="page === currentPage"
            [class.shadow-lg]="page === currentPage"
            [class.bg-white]="page !== currentPage"
            [class.text-slate-600]="page !== currentPage"
            [class.hover:bg-indigo-50]="page !== currentPage"
            class="h-9 w-9 rounded-lg text-sm font-bold transition-all border border-slate-200/50"
          >
            {{ page }}
          </button>
        </div>

        <button 
          (click)="changePage(currentPage + 1)"
          [disabled]="currentPage === totalPages"
          class="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:border-transparent transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `
})
export class Pagination {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get pages(): number[] {
    const total = this.totalPages;
    let pages: number[] = [];
    
    if (total <= 7) {
      pages = Array.from({ length: total }, (_, i) => i + 1);
    } else {
      // Simplified for now: show current, -1, +1, start, end
      pages = [1, ...new Set([
        Math.max(2, this.currentPage - 1),
        this.currentPage,
        Math.min(total - 1, this.currentPage + 1)
      ]), total].sort((a, b) => a - b);
    }
    return pages;
  }

  get startRange(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRange(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
