import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Collection {
    id: number;
    name: string;
    description: string;
    image: string;
    bookCount: number;
}

@Component({
    selector: 'app-featured-collections',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './featured-collections.component.html',
    styleUrl: './featured-collections.component.css',
})
export class FeaturedCollectionsComponent {
    collections: Collection[] = [
        {
            id: 1,
            name: "Staff Picks",
            description: "Handpicked by our book experts",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
            bookCount: 24
        },
        {
            id: 2,
            name: "Editor's Choice",
            description: "Must-read books this month",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
            bookCount: 18
        },
        {
            id: 3,
            name: "Award Winners",
            description: "Critically acclaimed masterpieces",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            bookCount: 32
        }
    ];
}
