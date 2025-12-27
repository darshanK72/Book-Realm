import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-star-rating',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './star-rating.component.html',
    styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
    @Input() rating: number = 0;
    @Input() maxStars: number = 5;

    get stars(): { filled: boolean; half: boolean }[] {
        const stars = [];
        for (let i = 1; i <= this.maxStars; i++) {
            if (i <= this.rating) {
                stars.push({ filled: true, half: false });
            } else if (i - 0.5 <= this.rating) {
                stars.push({ filled: false, half: true });
            } else {
                stars.push({ filled: false, half: false });
            }
        }
        return stars;
    }
}
