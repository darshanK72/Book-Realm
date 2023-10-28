import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(private renderer: Renderer2,private http: HttpClient,private route:ActivatedRoute,private scrollService:ScrollService) {}

  @ViewChild('desc')
  desc!: ElementRef;

  @ViewChild('btn')
  btn!: ElementRef;

  @ViewChild("mainImage")
  mainImg! : ElementRef;

  show: boolean = false;

  book!:Book;
  

  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('bookId') || '');

    this.http.get<Book>(`http://localhost:3000/book/${id}`).subscribe((data) => {
      this.book = data;
      console.log(this.book);
    });
  }

  readMore() {
    if (!this.show) {
      this.show = true;
      this.renderer.addClass(this.desc.nativeElement, 'show');
      this.btn.nativeElement.innerText = 'Show Less';
    } else {
      this.show = false;
      this.renderer.removeClass(this.desc.nativeElement, 'show');
      this.btn.nativeElement.innerText = 'Show More';
    }
  }

  changeImage(link:string,mainImage:HTMLDivElement){
    let im = mainImage.firstElementChild;
    im?.setAttribute("src",link);
  }
}
