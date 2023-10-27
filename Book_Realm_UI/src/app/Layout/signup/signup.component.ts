import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { ScrollService } from 'src/app/Services/scroll.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private renderer: Renderer2,private scrollService:ScrollService) {}

  @ViewChild('validations')
  validations!: ElementRef;

  @ViewChild("upper")
  upper!:ElementRef

  @ViewChild("lower")
  lower!:ElementRef

  @ViewChild("number")
  number!:ElementRef

  @ViewChild("special")
  special!:ElementRef

  @ViewChild("eight")
  eight!:ElementRef

  eleOpen: boolean = false;
  ngOnInit(): void {}

  toggleEye(ele: HTMLInputElement) {
    this.eleOpen = !this.eleOpen;
    if (this.eleOpen) {
      ele.setAttribute('type', 'text');
    } else {
      ele.setAttribute('type', 'password');
    }
  }

  showValidations(ele: HTMLInputElement) {
    if (ele.value !== '') {

      this.renderer.addClass(this.validations.nativeElement, 'show');

      let hasNumber = /\d/.test(ele.value);
      let hasUpper = /[A-Z]/.test(ele.value);
      let hasLower = /[a-z]/.test(ele.value);
      let hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(ele.value);
      let hasMinLength = ele.value.length >= 8;

      if(hasNumber){
        this.renderer.addClass(this.number.nativeElement,"valid");
      }

      if(hasUpper){
        this.renderer.addClass(this.upper.nativeElement,"valid");
      }
      else{
        this.renderer.removeClass(this.upper.nativeElement,"valid");
      }


      if(hasLower){
        this.renderer.addClass(this.lower.nativeElement,"valid");
      }
      else{
        this.renderer.removeClass(this.lower.nativeElement,"valid");
      }

      if(hasSpecialCharacter){
        this.renderer.addClass(this.special.nativeElement,"valid");
      }
      else{
        this.renderer.removeClass(this.special.nativeElement,"valid");
      }

      if(hasMinLength){
        this.renderer.addClass(this.eight.nativeElement,"valid");
      }
      else{
        this.renderer.removeClass(this.eight.nativeElement,"valid");
      }

    } else {
      this.renderer.removeClass(this.validations.nativeElement, 'show');
    }
  }
}
