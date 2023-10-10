import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private renderer:Renderer2){}

  @ViewChild('slider')
  slider!:ElementRef

  @HostListener('window:scroll',['$event'])
  onScroll(event:any){
    if(window.scrollY > 130){
      this.renderer.addClass(this.slider.nativeElement,"slider-hide");
      this.renderer.removeClass(this.slider.nativeElement,"slider-show");
    }
    else{
      this.renderer.removeClass(this.slider.nativeElement,"slider-hide");
      this.renderer.addClass(this.slider.nativeElement,"slider-show");
    }
    console.log(window.scrollY);
  }

}
