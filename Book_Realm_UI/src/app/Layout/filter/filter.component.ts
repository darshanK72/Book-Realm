import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {

  constructor(private renderer: Renderer2) {}

  name:string = 'lab';

  collapseFilter(collabsable:HTMLDivElement,angle:HTMLButtonElement) {

    console.log("hello");

    if (collabsable.classList.contains('collapse')) {
      this.renderer.removeClass(collabsable, 'collapse');
      this.renderer.removeClass(angle,"rotate")
    } else {
      this.renderer.addClass(collabsable, 'collapse');
      this.renderer.addClass(angle,"rotate")
    }
  }

}
