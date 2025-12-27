import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-trust-indicators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-indicators.component.html',
  styleUrl: './trust-indicators.component.css',
})
export class TrustIndicatorsComponent {
  indicators: TrustIndicator[] = [
    {
      icon: 'fa-truck-fast',
      title: 'Free Shipping',
      description: 'On orders over ₹500'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Secure Checkout',
      description: '100% protected payment'
    },
    {
      icon: 'fa-rotate-left',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: 'fa-headset',
      title: '24/7 Support',
      description: 'Dedicated customer service'
    }
  ];
}
