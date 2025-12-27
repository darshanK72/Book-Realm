import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between mb-4">
        <div
          [class]="'h-10 w-10 rounded-xl flex items-center justify-center ' + colorClass"
        >
          <div [innerHTML]="icon"></div>
        </div>
        <span 
          *ngIf="trend"
          [class]="'text-xs font-semibold px-2 py-1 rounded-full ' + trendClass"
        >
          {{ trendPrefix }}{{ trend }}%
        </span>
      </div>
      <h3 class="text-slate-500 text-sm font-medium">{{ label }}</h3>
      <p class="text-2xl font-bold text-slate-800 mt-1">{{ value }}</p>
    </div>
  `
})
export class StatCard {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() colorClass: string = 'bg-indigo-50 text-indigo-600';
  @Input() trend?: number;
  @Input() trendType: 'up' | 'down' = 'up';

  get trendClass(): string {
    return this.trendType === 'up' 
      ? 'text-emerald-600 bg-emerald-50' 
      : 'text-rose-600 bg-rose-50';
  }

  get trendPrefix(): string {
    return this.trendType === 'up' ? '+' : '-';
  }
}
