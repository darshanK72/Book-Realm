import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownOption {
  value: any;
  label: string;
  subLabel?: string;
  image?: string;
}

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative" #dropdownContainer>
      <label *ngIf="label" class="block text-sm font-semibold text-slate-700 mb-1.5">{{ label }}</label>
      
      <div 
        (click)="!disabled && toggle()"
        class="w-full min-h-[44px] px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all flex items-center gap-2 group shadow-sm"
        [class.ring-2]="isOpen"
        [class.ring-indigo-500/20]="isOpen"
        [class.border-indigo-500]="isOpen"
        [class.opacity-60]="disabled"
        [class.cursor-not-allowed]="disabled"
        [class.cursor-pointer]="!disabled"
      >
        <div class="flex-1 flex flex-wrap gap-1.5 overflow-hidden">
          <ng-container *ngIf="isMultiSelect && selectedOptions.length > 0; else singleDisplay">
            <div 
              *ngFor="let option of selectedOptions"
              class="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg text-xs font-bold animate-scale-in"
              (click)="$event.stopPropagation()"
            >
              {{ option.label }}
              <svg (click)="removeOption(option)" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hover:text-rose-600 transition-colors cursor-pointer"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
          </ng-container>
          <ng-template #singleDisplay>
            <span *ngIf="!selectedOption && !selectedOptions.length" class="text-slate-400 text-sm">{{ placeholder }}</span>
            <span *ngIf="selectedOption" class="text-slate-800 text-sm font-medium">{{ selectedOption.label }}</span>
          </ng-template>
        </div>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-indigo-500 transition-all" [class.rotate-180]="isOpen"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

      <!-- Dropdown Menu -->
      <div 
        *ngIf="isOpen" 
        class="absolute z-[60] left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden animate-slide-down origin-top"
      >
        <div class="p-2 border-b border-slate-50 bg-slate-50/50">
          <div class="relative">
            <input 
              #searchInput
              [(ngModel)]="searchTerm" 
              (click)="$event.stopPropagation()"
              type="text" 
              placeholder="Search..." 
              class="w-full pl-9 pr-4 py-2 bg-white rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all shadow-sm"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        <div class="max-h-60 overflow-y-auto custom-scrollbar p-1">
          <div 
            *ngFor="let option of filteredOptions" 
            (click)="selectOption(option)"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group"
            [class.bg-indigo-50]="isSelected(option)"
          >
            <div *ngIf="option.image" class="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
               <img [src]="option.image" class="h-full w-full object-cover">
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold" [class.text-indigo-600]="isSelected(option)" [class.text-slate-800]="!isSelected(option)">{{ option.label }}</p>
              <p *ngIf="option.subLabel" class="text-xs text-slate-500 truncate">{{ option.subLabel }}</p>
            </div>
            <div *ngIf="isSelected(option)" class="text-indigo-600 animate-scale-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          
          <div *ngIf="filteredOptions.length === 0" class="py-8 text-center text-slate-400 text-xs">
            No results found for "{{ searchTerm }}"
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-down { from { opacity: 0; transform: translateY(-8px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes scale-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
    .animate-slide-down { animation: slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scale-in 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
  `]
})
export class CustomDropdown {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: DropdownOption[] = [];
  @Input() isMultiSelect: boolean = false;
  @Input() multiSelect: boolean = false; // Backward compatibility
  @Input() disabled: boolean = false;
  
  @Input() set value(val: any) {
    const isMulti = this.isMultiSelect || this.multiSelect;
    if (isMulti) {
      if (Array.isArray(val)) {
        this.selectedOptions = this.options.filter(opt => val.includes(opt.value));
      }
    } else {
      this.selectedOption = this.options.find(opt => opt.value === val) || null;
    }
  }

  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  isOpen = false;
  searchTerm = '';
  selectedOption: DropdownOption | null = null;
  selectedOptions: DropdownOption[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    }
  }

  get filteredOptions() {
    return this.options.filter(opt => 
      opt.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      opt.subLabel?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectOption(option: DropdownOption) {
    if (this.disabled) return;
    const isMulti = this.isMultiSelect || this.multiSelect;
    if (isMulti) {
      const index = this.selectedOptions.findIndex(o => o.value === option.value);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      } else {
        this.selectedOptions.push(option);
      }
      this.valueChange.emit(this.selectedOptions.map(o => o.value));
    } else {
      this.selectedOption = option;
      this.valueChange.emit(option.value);
      this.isOpen = false;
    }
  }

  removeOption(option: DropdownOption) {
    this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
    this.valueChange.emit(this.selectedOptions.map(o => o.value));
  }

  isSelected(option: DropdownOption) {
    const isMulti = this.isMultiSelect || this.multiSelect;
    if (isMulti) {
      return this.selectedOptions.some(o => o.value === option.value);
    }
    return this.selectedOption?.value === option.value;
  }
}
