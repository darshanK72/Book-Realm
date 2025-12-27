import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, NavigationStart } from '@angular/router';
import { ToggleService } from 'src/app/Services/toggle/toggle.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [provideAnimations()],
    animations: [
        trigger('sliderToggle', [
            state('open', style({
                display: 'block',
                transform: 'translate(0%)'
            })),
            state('close', style({
                // width:'0px',
                display: "none",
                transform: 'translate(-100%)'
            })),
            transition('close => open', [animate('0.2s')]),
            transition('open => close', [animate('0.2s')]),
        ]),
    ],
    standalone: false
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('fullElement')
  fullElement!:ElementRef;

  ifLoggedIn = false;

  searchQuery:string = '';

  currentRoute!:string;

  constructor(private toggleService:ToggleService,private router:Router,private renderer:Renderer2){}

  ngAfterViewInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.currentRoute = data.url;
        if(this.currentRoute == '/admin'){
          this.renderer.addClass(this.fullElement.nativeElement,'hide');
        }
      }
    });
  }

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
