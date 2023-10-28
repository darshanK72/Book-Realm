import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private scrollService:ScrollService){}

}
