import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {
  email: string = '';
  isSubmitted: boolean = false;
  isError: boolean = false;

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.validateEmail(this.email)) {
      // Simulate API call
      console.log('Newsletter subscription:', this.email);
      this.isSubmitted = true;
      this.isError = false;
      this.email = '';

      // Reset success message after 3 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 3000);
    } else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 3000);
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
