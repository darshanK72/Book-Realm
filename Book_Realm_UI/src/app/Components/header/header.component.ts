import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToggleService } from 'src/app/Services/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  currentRoute!:any;

  constructor(private renderer:Renderer2,private toggleService:ToggleService,private router: Router){}

  ngAfterViewInit(): void {
    console.log(this.router.url);

    this.router.events.subscribe(data => {
      if(data instanceof NavigationStart ) {
        this.currentRoute = data.url;
        if(this.currentRoute == "/signin" || this.currentRoute == "/signup"){
          this.renderer.addClass(this.slider.nativeElement,"hide");
        }
      }
    })
  }

  @ViewChild('slider')
  slider!:ElementRef

  @ViewChild('topgeners')
  topgeners!:ElementRef

  @ViewChild('discover')
  discover!:ElementRef

  @ViewChild('friction')
  friction!:ElementRef

  @ViewChild('examprep')
  examprep!:ElementRef

  @ViewChild('hovertopGenerModel')
  hovertopGenerModel!:ElementRef

  @ViewChild('hoverDiscoverModel')
  hoverDiscoverModel!:ElementRef

  @ViewChild('hoverFrictionModel')
  hoverFrictionModel!:ElementRef

  @ViewChild('hoverExamprepModel')
  hoverExamprepModel!:ElementRef

  @ViewChild('profile')
  profile!:ElementRef

  ifLoggedIn = false;
  showprof = false;

  searchQuery!:string;

  showProfile(){
    this.showprof = !this.showprof;
    if(this.showprof){

      this.renderer.addClass(this.profile.nativeElement,"show-profile")
    }
    else{
      this.renderer.removeClass(this.profile.nativeElement,"show-profile")
    }
  }

  getSearchQuery(event:any){
    this.searchQuery = event.target.value;
  }

  // @HostListener('document:click',['$event'])
  // bodyClick(){
  //   this.renderer.removeClass(this.profile.nativeElement,"show-profile")
  // }
  
  @HostListener('window:scroll',['$event'])
  onScroll(event:any){
    if(window.scrollY > 40){
      this.renderer.addClass(this.slider.nativeElement,"slider-hide");
      this.renderer.removeClass(this.slider.nativeElement,"slider-show");
    }
    else{
      this.renderer.removeClass(this.slider.nativeElement,"slider-hide");
      this.renderer.addClass(this.slider.nativeElement,"slider-show");
    }
  }

  mouseOver(navItem:HTMLLIElement){
    if(navItem.title == "topgeners"){
      this.renderer.addClass(this.hovertopGenerModel.nativeElement,"show");
    }
    else if(navItem.title == "discover"){
      this.renderer.addClass(this.hoverDiscoverModel.nativeElement,"show");
    }
    else if(navItem.title == "friction"){
      this.renderer.addClass(this.hoverFrictionModel.nativeElement,"show");
    }
    else if(navItem.title == "examprep"){
      this.renderer.addClass(this.hoverExamprepModel.nativeElement,"show");
    }
  }

  mouseOut(navItem:HTMLLIElement){
    if(navItem.title == "topgeners"){
      this.renderer.removeClass(this.hovertopGenerModel.nativeElement,"show");
    }
    else if(navItem.title == "discover"){
      this.renderer.removeClass(this.hoverDiscoverModel.nativeElement,"show");
    }
    else if(navItem.title == "friction"){
      this.renderer.removeClass(this.hoverFrictionModel.nativeElement,"show");
    }
    else if(navItem.title == "examprep"){
      this.renderer.removeClass(this.hoverExamprepModel.nativeElement,"show");
    }
  }

  toggleSidebar(){
    this.toggleService.sidebarEmmiter.emit(true);
  }




}
