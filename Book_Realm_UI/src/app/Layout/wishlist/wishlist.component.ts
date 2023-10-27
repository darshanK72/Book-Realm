import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  
  constructor(private scrollService:ScrollService){}


}
