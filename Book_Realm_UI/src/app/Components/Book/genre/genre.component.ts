import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { selectBooksBySubgenreId } from 'src/app/Store/book/book.selectors';
import { selectGenreById } from 'src/app/Store/genre/genre.selectors';
import { selectSubgenresByGenreId } from 'src/app/Store/subgenre/subgenre.selectors';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genreId!: any;
  genre!: any;
  subgenres!: Subgenre[];

  subgBooks:any[] = [];

  subgen1Description!: string;
  subgen1Books!: Book[];

  subgen2Description!: string;
  subgen2Books!: Book[];

  subgen3Description!: string;
  subgen3Books!: Book[];

  constructor(
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    // this.route.paramMap.subscribe((map) => {
    //   this.genreId = map.get('id');
    //   this.store.select(selectGenreById(this.genreId)).subscribe((data) => {
    //     this.genre = data;
    //     console.log(this.genre);
    //     this.store
    //     .select(selectSubgenresByGenreId(this.genre.id))
    //     .subscribe((data) => {
    //       this.subgenres = data;
    //       console.log(this.subgenres);

    //       this.subgBooks = [];

    //       this.subgenres.forEach((subgenre) => {
    //         this.store
    //           .select(selectBooksBySubgenreId(subgenre.id))
    //           .subscribe((books) => {
    //             this.subgBooks.push({description:subgenre.description,books:books});

    //           });
    //       });
    //     });
    //   });
    // });
  }
}
