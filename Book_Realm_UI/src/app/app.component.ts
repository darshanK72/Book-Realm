import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  title = 'Book_Realm_UI';

  ngOnInit(): void {
    // console.log(this.router.url);
  }

  showSidebar: boolean = false;

  sidebarToggle(event: any) {
    this.showSidebar = event;
    console.log(this.showSidebar);
  }
}
