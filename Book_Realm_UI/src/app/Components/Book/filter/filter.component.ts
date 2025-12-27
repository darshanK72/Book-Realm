import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, concat, concatMap, forkJoin } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { Genre } from 'src/app/Models/genre';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    standalone: false
})
export class FilterComponent implements OnInit{

  @ViewChild('filterEle')
  filterEle!:ElementRef;

  books!:Book[];

  baseUrl:string = environment.baseUrl;
  authUrl:string = environment.authUrl;

  constructor(private renderer: Renderer2,private http:HttpClient,private scrollService:ScrollService) {}

  ngOnInit(): void {

  //   this.http
  // .get<Book[]>(`${this.baseUrl}/book`)
  // .pipe(
  //   concatMap((data) => {
  //     this.books = data;
  //     console.log(data);
  //     const observables: Observable<unknown>[] = [];

  //     this.books.forEach((book: any) => {
  //       book.authorId = 'B7014592-8F73-4CE6-E7C3-08DC4C3AC647';
  //       book.publisherId = '1D265A17-0BCF-427E-E7C4-08DC4C3AC647';

  //       const genreObservable = this.http.get(`${this.baseUrl}/genre/${book.genreId}`).pipe(
  //         concatMap((genre: any) => {
  //           return this.http.post(`${this.authUrl}/genres/name`, { name: genre.name });
  //         })
  //       );

  //       const subgenreObservable = this.http.get(`${this.baseUrl}/subgenre/${book.subgenreId}`).pipe(
  //         concatMap((subgenre: any) => {
  //           return this.http.post(`${this.authUrl}/subgenres/name`, { name: subgenre.name });
  //         })
  //       );

  //       observables.push(
  //         genreObservable.pipe(
  //           concatMap((genre: any) => {
  //             book.genreId = genre.id;
  //             return subgenreObservable.pipe(
  //               concatMap((subgenre: any) => {
  //                 book.subgenreId = subgenre.id;
  //                 return this.http.post(`${this.authUrl}/books`, book).pipe(
  //                   concatMap((result: any) => {
  //                     const imageObservables = book.images.map((imageUrl: any, index: number) => {
  //                       return this.http.post(`${this.authUrl}/images/book/uploadfromurl`, {
  //                         imageUrl: imageUrl,
  //                         fileName: result.title + index,
  //                         bookId: result.id // Use result.id here to capture the correct BookId
  //                       });
  //                     });
  //                     return forkJoin(imageObservables);
  //                   })
  //                 );
  //               })
  //             );
  //           })
  //         )
  //       );
  //     });

  //     return concat(...observables);
  //   })
  // )
  // .subscribe(() => {
  //   console.log("All requests completed successfully.");
  // });

  let booksss: any[] = [];

    this.http
      .get<Book[]>(`${this.baseUrl}/book`)
      .subscribe((data) => {
        this.books = data;
        console.log(data)});

        // this.books.forEach((book:any) => {
          
        //   book.authorId = 'B7014592-8F73-4CE6-E7C3-08DC4C3AC647';
        //   book.publisherId = '1D265A17-0BCF-427E-E7C4-08DC4C3AC647';

        //   this.http.get(`${this.baseUrl}/genre/${book.genreId}`).subscribe((genre:any) => {
        //     this.http.post(`${this.authUrl}/genres/name`,{name:genre.name}).subscribe((g:any) => {
        //       book.genreId = g.id;
        //       this.http.get(`${this.baseUrl}/subgenre/${book.subgenreId}`).subscribe((subgenre:any) => {
        //         this.http.post(`${this.authUrl}/subgenres/name`,{name:subgenre.name}).subscribe((s:any) => {
        //           book.subgenreId = s.id;

        //           booksss.push(book);
        //           console.log(booksss);
                  // this.http.post(`${this.authUrl}/books`,book).subscribe((result:any) => {
                  //   book.images.forEach((i:any,index:any) => {
                  //     console.log(result);
                  //     this.http.post(`${this.authUrl}/images/book/uploadfromurl`,{imageUrl:i,fileName:result.title + index,bookId:result.id}).subscribe(data => {
                  //       console.log(data);
                  //     })
                  //   })
                  // })
      //           })
      //         })
      //       })
      //     })
      //   })

        
      // });

    // this.http.get<Genre[]>(`${this.baseUrl}/genre`)
    //    .subscribe((genres) => {
    //     genres.forEach(genre => {
    //       this.http.post(`${this.authUrl}/genres`,{name:genre.name,description:genre.description}).subscribe((newgenre:any) => {
    //         genre.subgenres.forEach(subgenreId => {
    //           this.http.get<Subgenre>(`${this.baseUrl}/subgenre/${subgenreId}`).subscribe(subgenre => {
    //             this.http.post(`${this.authUrl}/subgenres`,{name:subgenre.name,description:subgenre.description,genreId:newgenre.id}).subscribe(subgenre => {
    //               console.log(subgenre);
    //             })
    //           })
    //         })
    //       })
    //     })
    //    })
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
