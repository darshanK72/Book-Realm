import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from './components/stat-card/stat-card';
import { RecentActivity, ActivityItem } from './components/recent-activity/recent-activity';
import { SalesChart } from './components/sales-chart/sales-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCard, RecentActivity, SalesChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activities: ActivityItem[] = [
    {
      id: 1,
      userInitials: 'JD',
      avatarColor: 'bg-indigo-100',
      avatarTextColor: 'text-indigo-600',
      title: 'John Doe placed an order',
      time: '2 minutes ago',
      amount: '$120.00'
    },
    {
      id: 2,
      userInitials: 'BK',
      avatarColor: 'bg-emerald-100',
      avatarTextColor: 'text-emerald-600',
      title: 'New Book Published: "The Void"',
      time: '4 hours ago'
    },
    {
      id: 3,
      userInitials: 'AS',
      avatarColor: 'bg-purple-100',
      avatarTextColor: 'text-purple-600',
      title: 'Alice Smith registered as partner',
      time: '1 day ago'
    }
  ];

  icons = {
    customers: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    orders: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    revenue: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>`,
    books: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  };
}
