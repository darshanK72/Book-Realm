import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  @ViewChild('profile')
  profile!: ElementRef;

  @ViewChild('showprofbtn')
  showprofbtn!: ElementRef;

  showprof = false;

  constructor(private renderer:Renderer2) {}


  hideProfile() {
    this.showprof = false;
    this.renderer.removeClass(this.profile.nativeElement, 'show-profile');
  }

}
