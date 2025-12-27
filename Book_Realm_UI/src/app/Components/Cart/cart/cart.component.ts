import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent {
  
  constructor(private scrollService:ScrollService){}
}
