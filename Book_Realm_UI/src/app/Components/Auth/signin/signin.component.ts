import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  eleOpen: boolean = false;

  constructor(private scrollService:ScrollService){}

  toggleEye(ele: HTMLInputElement) {
    this.eleOpen = !this.eleOpen;
    if (this.eleOpen) {
      ele.setAttribute('type', 'text');
    } else {
      ele.setAttribute('type', 'password');
    }
  }

}
