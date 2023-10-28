import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Book } from 'src/app/Models/book';
import { Subgenre } from 'src/app/Models/subgenre';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-subgenre',
  templateUrl: './subgenre.component.html',
  styleUrls: ['./subgenre.component.css'],
})
export class SubgenreComponent implements OnInit {
  books!: Book[];
  subgenreId!: any;
  genreId!:any;
  subgenreName!:string;
  subgenres:Subgenre[] = [];

  constructor(
    private http: HttpClient,
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(map => {
      this.subgenreId = map.get("id");

      this.http
          .get<Book[]>(' http://localhost:3000/book')
          .subscribe((data) => {
            this.books = data.filter((b) => b.subgenreId == this.subgenreId);
            this.genreId = this.books[0].genreId;

            this.http
            .get<Subgenre[]>(`http://localhost:3000/subgenre?genreId=${this.genreId}`).subscribe(data => {
              this.subgenres = data;

              this.subgenreName = this.subgenres.find(s => s.id == this.subgenreId)?.name || '';
            })
          });

    })
  }
}
