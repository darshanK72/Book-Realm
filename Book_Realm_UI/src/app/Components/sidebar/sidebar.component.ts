import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToggleService } from 'src/app/Services/toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [provideAnimations()],
  animations: [
    trigger('sliderToggle', [
      state(
        'open',
        style({
          display:'block',
          transform:'translate(0%)'
        })
      ),
      state(
        'close',
        style({
          // width:'0px',
          display:"none",
          transform:'translate(-100%)'
        })
      ),
      transition('close => open', [animate('0.2s')]),
      transition('open => close', [animate('0.2s')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {

  ifLoggedIn = false;

  searchQuery!:string;

  constructor(private toggleService:ToggleService){}

  @Input()
  toShow:boolean = true;

  ngOnInit(){
    this.toggleService.sidebarEmmiter.subscribe(data => {
      this.toShow = data;
    })
  }

  getSearchQuery(event:any){
    this.searchQuery = event.target.value;
  }


  close(){
    this.toggleService.sidebarEmmiter.emit(false);
  }
}
