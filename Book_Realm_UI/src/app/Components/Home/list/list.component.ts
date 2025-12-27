import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/Models/book';
import { AppState } from 'src/app/Store/app.state';
import { getBookSections } from 'src/app/Store/home/home.actions';
import { selectBookSectionById } from 'src/app/Store/home/home.selectors';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    standalone: false
})
export class ListComponent implements OnInit {
  @Input() sectionId!: string;
  @Input() bookIds!: string[];
  @Input() sectionName!: string;

  bookData: Book[] = [];

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(getBookSections({
      payload: {
        sectionId: this.sectionId,
        sectionName: this.sectionName,
        bookIds: this.bookIds
      }
    }));

    this.store.select(selectBookSectionById(this.sectionId)).subscribe(
      bookSection => {
        if (bookSection) {
          this.bookData = bookSection.books;
        }
      }
    );
  }

  getBookDetail(i: string) {
    this.router.navigate(["/detail", i]);
  }
}
