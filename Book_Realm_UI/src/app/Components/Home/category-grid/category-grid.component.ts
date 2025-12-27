import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  route: string;
}

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-grid.component.html',
  styleUrl: './category-grid.component.css',
})
export class CategoryGridComponent {
  categories: Category[] = [
    { id: 1, name: 'Fiction', icon: 'fa-book', color: '#FF6B6B', route: '/genre/4' },
    { id: 2, name: 'Non-Fiction', icon: 'fa-lightbulb', color: '#4ECDC4', route: '/genre/5' },
    { id: 3, name: 'Children', icon: 'fa-child', color: '#FFE66D', route: '/genre/6' },
    { id: 4, name: 'Academic', icon: 'fa-graduation-cap', color: '#95E1D3', route: '/genre/7' },
    { id: 5, name: 'Biography', icon: 'fa-user', color: '#F38181', route: '/genre/2' },
    { id: 6, name: 'Self-Help', icon: 'fa-heart', color: '#AA96DA', route: '/genre/9' },
  ];
}
