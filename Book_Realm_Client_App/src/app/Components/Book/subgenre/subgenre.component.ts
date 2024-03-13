import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { selectBooksBySubgenreId } from 'src/app/Store/book/book.selectors';
import { selectSubgenreById, selectSubgenresByGenreId } from 'src/app/Store/subgenre/subgenre.selectors';

@Component({
  selector: 'app-subgenre',
  templateUrl: './subgenre.component.html',
  styleUrls: ['./subgenre.component.css']
})
export class SubgenreComponent implements OnInit {
  books!: Book[];
  subgenreId!: any;
  genreId!: any;
  subgenreName!: any;
  subgenres: Subgenre[] = [];

  constructor(
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      this.subgenreId = map.get('id');

      this.store
        .select(selectSubgenreById(this.subgenreId))
        .subscribe((subgenre) => {
          this.subgenreName = subgenre?.name;

          this.store
            .select(selectBooksBySubgenreId(this.subgenreId))
            .subscribe((books) => {
              this.books = books;

              this.genreId = this.books[0].genreId;

              this.store.select(selectSubgenresByGenreId(this.genreId)).subscribe(subgenres => {
                this.subgenres = subgenres;
              })
            });
        });
    });
  }
}
