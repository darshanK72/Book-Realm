import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Book } from 'src/app/Models/book';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('profile')
  profile!: ElementRef;

  @ViewChild('showprofbtn')
  showprofbtn!: ElementRef;

  showprof = false;

  books!: Book[];

  baseUrl: string = environment.baseUrl;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Book[]>(`${this.baseUrl}/book`).subscribe((data) => {
      this.books = data;
      console.log(data);
    });
  }

  hideProfile() {
    this.showprof = false;
    this.renderer.removeClass(this.profile.nativeElement, 'show-profile');
  }
}
