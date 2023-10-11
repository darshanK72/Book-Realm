import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Book_Realm_UI';

  showSidebar: boolean = false;

  sidebarToggle(event: any) {
    this.showSidebar = event;
    console.log(this.showSidebar);
  }
}
