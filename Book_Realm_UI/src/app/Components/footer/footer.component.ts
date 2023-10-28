import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit{

  @ViewChild('fullElement')
  fullElement!:ElementRef;

  currentRoute!:string;

  constructor(private router:Router,private renderer:Renderer2){}

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

}
