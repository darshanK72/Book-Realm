import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AppState } from 'src/app/Store/app.state';
import { Store } from '@ngrx/store';
import { signIn } from 'src/app/Store/auth/auth.actions';
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
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    
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
      console.log(this.signinForm.value);
      this.store.dispatch(
        signIn({ payload: { signinRequest: this.signinForm.value } })
      );
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
