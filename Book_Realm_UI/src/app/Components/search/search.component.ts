import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges{

  constructor(private renderer:Renderer2){}

  @Input()
  query!:string;

  @ViewChild('wrapper')
  wrapper!:ElementRef

  ngOnInit(){
   
  }

  ngOnChanges(): void {
    console.log(this.query);
    this.toShowSearch(this.query);
  } 

  toShowSearch(query:string){
    if(query != ''){
      this.renderer.addClass(this.wrapper.nativeElement,"show");
    }
    else{
      this.renderer.removeClass(this.wrapper.nativeElement,"show");
    }
  }

}
