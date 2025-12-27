import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActivityItem {
  id: number;
  userInitials: string;
  avatarColor: string;
  avatarTextColor: string;
  title: string;
  time: string;
  amount?: string;
}

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 class="text-lg font-bold text-slate-800 mb-4">{{ title }}</h2>
      <div class="space-y-4">
        <div
          *ngFor="let item of items"
          class="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div
            [class]="'h-10 w-10 rounded-full flex items-center justify-center font-bold ' + item.avatarColor + ' ' + item.avatarTextColor"
          >
            {{ item.userInitials }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-800">{{ item.title }}</p>
            <p class="text-xs text-slate-500">{{ item.time }}</p>
          </div>
          <div *ngIf="item.amount" class="text-sm font-bold text-slate-800">{{ item.amount }}</div>
        </div>
      </div>
    </div>
  `
})
export class RecentActivity {
  @Input() title: string = 'Recent Activity';
  @Input() items: ActivityItem[] = [];
}
