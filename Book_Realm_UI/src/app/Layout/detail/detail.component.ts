import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(private renderer:Renderer2){}

  @ViewChild('desc')
  desc!:ElementRef;

  @ViewChild('btn')
  btn!:ElementRef;

  show:boolean = false;

  readMore(){
    if(!this.show){
      this.show = true;
      this.renderer.addClass(this.desc.nativeElement,"show");
      this.btn.nativeElement.innerText = 'Show Less';
    }
    else{
      this.show = false;
      this.renderer.removeClass(this.desc.nativeElement,"show");
      this.btn.nativeElement.innerText = 'Show More';
    }
  }
}
