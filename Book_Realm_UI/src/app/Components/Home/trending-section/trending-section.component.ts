import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TrendingBook {
    id: number;
    title: string;
    authorName: string;
    price: number;
    images: string[];
    rank: number;
}

@Component({
    selector: 'app-trending-section',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './trending-section.component.html',
    styleUrl: './trending-section.component.css',
})
export class TrendingSectionComponent implements OnInit {
    trendingBooks: TrendingBook[] = [];
    isLoading: boolean = true;

    ngOnInit(): void {
        // Simulate loading trending books
        // In a real app, this would fetch from an API
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    }

    getBookDetail(bookId: number): void {
        // Navigate to book detail page
        console.log('Navigate to book:', bookId);
    }
}
