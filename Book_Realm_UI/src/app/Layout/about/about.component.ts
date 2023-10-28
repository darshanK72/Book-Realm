import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private scrollService:ScrollService) {}
}
