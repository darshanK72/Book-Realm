import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { ScrollService } from 'src/app/Services/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit{

  @ViewChild('filterEle')
  filterEle!:ElementRef;

  books!:Book[];

  baseUrl:string = environment.baseUrl;

  constructor(private renderer: Renderer2,private http:HttpClient,private scrollService:ScrollService) {}

  ngOnInit(): void {
    this.http
      .get<Book[]>(`${this.baseUrl}/book`)
      .subscribe((data) => {
        this.books = data;
        console.log(data);
      });
  }

  name:string = 'lab';

  collapseFilter(collabsable:HTMLDivElement,angle:HTMLButtonElement) {

    console.log("hello");

    if (collabsable.classList.contains('collapse')) {
      this.renderer.removeClass(collabsable, 'collapse');
      this.renderer.removeClass(angle,"rotate")
    } else {
      this.renderer.addClass(collabsable, 'collapse');
      this.renderer.addClass(angle,"rotate")
    }
  }

  showFilter(){
    this.renderer.removeClass(this.filterEle.nativeElement,"hide");
  }

  hideFilter(){
    this.renderer.addClass(this.filterEle.nativeElement,"hide");
  }

}
