import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  eleOpen: boolean = false;
  signinForm!:FormGroup;

  constructor(private scrollService:ScrollService,private fb: FormBuilder){}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  toggleEye(ele: HTMLInputElement) {
    this.eleOpen = !this.eleOpen;
    if (this.eleOpen) {
      ele.setAttribute('type', 'text');
    } else {
      ele.setAttribute('type', 'password');
    }
  }


  onSigninSubmit(){
    if (this.signinForm.valid) {
      console.log('Form submitted successfully');
    }
    else {
      this.validateAllFormFields(this.signinForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }


}
