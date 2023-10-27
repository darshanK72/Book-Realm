import { Component } from '@angular/core';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {

  
  constructor(private scrollService:ScrollService){}


}
