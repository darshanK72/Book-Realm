import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, switchMap, take, tap } from 'rxjs';
import { Book } from 'src/app/Models/book';
import { Genre } from 'src/app/Models/genre';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent implements OnInit {
  genreId!: any;
  genre!: any;

  subgenres:Subgenre[] = [];

  subgen1Description!: string;
  subgen1Books!: Book[];

  subgen2Description!: string;
  subgen2Books!: Book[];

  subgen3Description!: string;
  subgen3Books!: Book[];

  constructor(
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((map) => {
          this.genreId = map.get('id');
          return this.http.get<Genre>(
            `http://localhost:3000/genre/${this.genreId}`
          );
        }),
        switchMap((gen) => {
          this.genre = gen;

          const subgenreObservables = gen.subgenres.map((subid) =>
            this.http
              .get<Subgenre>(`http://localhost:3000/subgenre/${subid}`)
              .pipe(
                switchMap((subgen) => {

                  this.subgenres.push(subgen);

                  return this.http
                    .get<Book[]>(
                      `http://localhost:3000/book?subgenreId=${subgen.id}`
                    )
                    .pipe(
                      map((data) => ({
                        description: subgen.description,
                        books: data,
                      }))
                    );
                })
              )
          );

          return forkJoin(subgenreObservables);
        })
      )
      .subscribe(
        ([subgen1, subgen2, subgen3]) => {
          this.subgen1Description = subgen1.description;
          this.subgen1Books = subgen1.books;

          this.subgen2Description = subgen2.description;
          this.subgen2Books = subgen2.books;

          this.subgen3Description = subgen3.description;
          this.subgen3Books = subgen3.books;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
