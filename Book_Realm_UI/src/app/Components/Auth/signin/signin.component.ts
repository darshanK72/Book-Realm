import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  eleOpen: boolean = false;
  signinForm!: FormGroup;
  widthbtn: number = 400;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private scrollService: ScrollService,
    private fb: FormBuilder
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.signInWithGoogle(user);
      console.log(user);
    });
  }

  ngOnInit(): void {
    this.widthbtn = 400;
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

  onSigninSubmit() {
    if (this.signinForm.valid) {
      console.log('Form submitted successfully');
    } else {
      this.validateAllFormFields(this.signinForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
