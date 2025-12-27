import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Book } from 'src/app/Models/book';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { selectBooks } from 'src/app/Store/book/book.selectors';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    standalone: false
})
export class DetailComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private route: ActivatedRoute,
    private scrollService: ScrollService,
    private store: Store<AppState>,
    private router:Router
  ) {}

  books$ = this.store.pipe(select(selectBooks));

  @ViewChild('desc')
  desc!: ElementRef;

  @ViewChild('btn')
  btn!: ElementRef;

  @ViewChild('mainImage')
  mainImg!: ElementRef;

  show: boolean = false;

  book!: Book;
  bookId!:number;

  baseUrl: string = environment.baseUrl;

  relatedBooks!:Book[];

  ngOnInit(): void {
    
    // this.route.paramMap.subscribe((params) => {
    //   this.bookId = parseInt(params.get('bookId') || '');

    //   this.http.get<Book>(`${this.baseUrl}/book/${this.bookId}`).subscribe((data) => {
    //     this.book = data;
    //     console.log(this.book);
    //    });
  
    //    this.books$.subscribe((data) => this.relatedBooks = data.filter((book) => book.subgenreId == 16));
    // })
  
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

  changeImage(link: string, mainImage: HTMLDivElement) {
    let im = mainImage.firstElementChild;
    im?.setAttribute('src', link);
  }

  getBookDetail(i:string){
    console.log(i);
    this.router.navigate(["/detail",i])
  }
}
