import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/Models/book';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input()
  books!:Book[];

  @Input()
  genreTitle!:string;
  constructor(private router:Router){}

  getBookDetail(i:number){

    this.router.navigate(["/detail",i])

  }
}
