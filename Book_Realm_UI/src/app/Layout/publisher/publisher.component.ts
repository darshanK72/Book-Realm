import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {

  
  constructor(private scrollService:ScrollService){}

}
