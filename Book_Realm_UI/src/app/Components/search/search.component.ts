import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { change } from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges{

  constructor(private renderer:Renderer2){

    this.renderer.listen('window', 'click',(e:Event)=>{

    if(!this.wrapper.nativeElement.contains(e.target)){
      this.query = ''
      this.toShowSearch(this.query);
    }
 });

  }

  @Input()
  query:string = '';

  @ViewChild('wrapper')
  wrapper!:ElementRef

  ngOnInit(){
   
  }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['query'].currentValue != ''){
      this.toShowSearch(this.query);
    }
    else if(changes['query'].previousValue != undefined && changes['query'].currentValue == ''){
      this.toShowSearch(this.query)
    }
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
