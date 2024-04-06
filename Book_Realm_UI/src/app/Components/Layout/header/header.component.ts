import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToggleService } from 'src/app/Services/toggle/toggle.service';
import { AppState } from 'src/app/Store/app.state';
import { signOut } from 'src/app/Store/auth/auth.actions';
import { selectIsLoggedIn, selectLoggedInUser } from 'src/app/Store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  
  @ViewChild('fullElement')
  fullElement!:ElementRef;

  @ViewChild('slider')
  slider!: ElementRef;

  @ViewChild('showprof')
  showproff!: ElementRef;

  @ViewChild('topgeners')
  topgeners!: ElementRef;

  @ViewChild('discover')
  discover!: ElementRef;

  @ViewChild('friction')
  friction!: ElementRef;

  @ViewChild('examprep')
  examprep!: ElementRef;

  @ViewChild('hovertopGenerModel')
  hovertopGenerModel!: ElementRef;

  @ViewChild('hoverDiscoverModel')
  hoverDiscoverModel!: ElementRef;

  @ViewChild('hoverFrictionModel')
  hoverFrictionModel!: ElementRef;

  @ViewChild('hoverExamprepModel')
  hoverExamprepModel!: ElementRef;

  @ViewChild('profile')
  profile!: ElementRef;

  @ViewChild('showprofbtn')
  showprofbtn!: ElementRef;

  ifLoggedIn = false;
  currentUser:any;
  showprof = false;

  searchQuery: string = '';

  currentRoute!: string;

  constructor(
    private renderer: Renderer2,
    private toggleService: ToggleService,
    private router: Router,
    private store:Store<AppState>
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if ( this.showprofbtn &&
        e.target == this.showprofbtn?.nativeElement &&
        this.showprof == false
      ) {
        this.showprof = true;
        this.showProfile();
      } else if (this.profile && this.profile.nativeElement.contains(e.target)) {
        this.showprof = true;
        this.showProfile();
      } else if(this.showprofbtn) {
        this.showprof = false;
        this.showProfile();
      }
    });
  }

  ngOnInit(){
    this.store.pipe(select(selectIsLoggedIn)).subscribe(data => {
      this.ifLoggedIn = data;
      this.store.pipe(select(selectLoggedInUser)).subscribe(user => {
        this.currentUser = user;
      })
    })
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationStart) {
        this.currentRoute = data.url;
        if (
          this.currentRoute == '/' ||
          this.currentRoute == '/home' ||
          this.currentRoute.includes("sub-genre") ||
          this.currentRoute.includes("genre") ||
          this.currentRoute == '/filter'
        ) {
          this.renderer.removeClass(this.slider.nativeElement, 'hide');
        } 
        else if(this.currentRoute == '/admin'){
          this.renderer.addClass(this.fullElement.nativeElement,'hide');
        }
        else if(this.currentRoute == '/author'){
          this.renderer.addClass(this.fullElement.nativeElement,'hide');
        }
        else if(this.currentRoute == '/publisher'){
          this.renderer.addClass(this.fullElement.nativeElement,'hide');
        }
        else {
          this.renderer.addClass(this.slider.nativeElement, 'hide');
        }
      }
    });
  }

  signOut(){
    this.store.dispatch(signOut());
  }

  showProfile() {
    if (this.showprof) {
      this.renderer.addClass(this.profile.nativeElement, 'show-profile');
    } else {
      this.renderer.removeClass(this.profile.nativeElement, 'show-profile');
    }
  }

  hideProfile() {
    this.showprof = false;

    this.renderer.removeClass(this.profile.nativeElement, 'show-profile');
  }

  getSearchQuery(event: any) {
    this.searchQuery = event.target.value;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.scrollY > 40) {
      this.renderer.addClass(this.slider.nativeElement, 'slider-hide');
      this.renderer.removeClass(this.slider.nativeElement, 'slider-show');
    } else {
      this.renderer.removeClass(this.slider.nativeElement, 'slider-hide');
      this.renderer.addClass(this.slider.nativeElement, 'slider-show');
    }
  }

  mouseOver(navItem: HTMLLIElement) {
    if (navItem.title == 'topgeners') {
      this.renderer.addClass(this.hovertopGenerModel.nativeElement, 'show');
    } else if (navItem.title == 'discover') {
      this.renderer.addClass(this.hoverDiscoverModel.nativeElement, 'show');
    } else if (navItem.title == 'friction') {
      this.renderer.addClass(this.hoverFrictionModel.nativeElement, 'show');
    } else if (navItem.title == 'examprep') {
      this.renderer.addClass(this.hoverExamprepModel.nativeElement, 'show');
    }
  }

  mouseOut(navItem: HTMLLIElement) {
    if (navItem.title == 'topgeners') {
      this.renderer.removeClass(this.hovertopGenerModel.nativeElement, 'show');
    } else if (navItem.title == 'discover') {
      this.renderer.removeClass(this.hoverDiscoverModel.nativeElement, 'show');
    } else if (navItem.title == 'friction') {
      this.renderer.removeClass(this.hoverFrictionModel.nativeElement, 'show');
    } else if (navItem.title == 'examprep') {
      this.renderer.removeClass(this.hoverExamprepModel.nativeElement, 'show');
    }
  }

  toggleSidebar() {
    this.toggleService.sidebarEmmiter.emit(true);
  }
}

