import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  constructor(private scrollService:ScrollService){}

  scroll(el: HTMLElement) {

    el.scrollIntoView({ behavior: 'smooth' });
  
  }
}
