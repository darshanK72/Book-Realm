import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ScrollService } from 'src/app/Services/scroll/scroll.service';
import { AppState } from 'src/app/Store/app.state';
import { singnUp } from 'src/app/Store/auth/auth.actions';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: false
})
export class SignupComponent implements OnInit {
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private renderer: Renderer2,
    private scrollService: ScrollService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
   
  }

  @ViewChild('validations')
  validations!: ElementRef;

  @ViewChild('upper')
  upper!: ElementRef;

  @ViewChild('lower')
  lower!: ElementRef;

  @ViewChild('number')
  number!: ElementRef;

  @ViewChild('special')
  special!: ElementRef;

  @ViewChild('eight')
  eight!: ElementRef;

  @ViewChild('passmatch')
  passmatch!: ElementRef;

  eleOpen: boolean = false;

  signupForm!: FormGroup;
  widthbtn: number = 400;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  isMobile(){
    const screenWidth = window.innerWidth;
    const mobileWidthThreshold = 768; 
    return screenWidth < mobileWidthThreshold;
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.store.dispatch(
        singnUp({
          payload: {
            signupRequest: {
              name: this.signupForm.value.name,
              email: this.signupForm.value.email,
              password: this.signupForm.value.password,
              mobile: this.signupForm.value.mobile,
              role:"User"
            },
          },
        })
      );
    } else {
      this.validateAllFormFields(this.signupForm);
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

  toggleEye(ele: HTMLInputElement) {
    this.eleOpen = !this.eleOpen;
    if (this.eleOpen) {
      ele.setAttribute('type', 'text');
    } else {
      ele.setAttribute('type', 'password');
    }
  }

  buttonDisabled(signupForm: FormGroup) {
    if (signupForm.valid) {
      if (signupForm.value?.password == signupForm.value?.confirmPassword) {
        return false;
      }
    }
    return true;
  }

  showValidations(signupForm: FormGroup) {
    let password = signupForm.value?.password;
    if (signupForm.value?.password) {
      this.renderer.addClass(this.validations.nativeElement, 'show');

      let hasNumber = /\d/.test(password);
      let hasUpper = /[A-Z]/.test(password);
      let hasLower = /[a-z]/.test(password);
      let hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      let hasMinLength = password.length >= 8;

      if (hasNumber) {
        this.renderer.addClass(this.number.nativeElement, 'valid');
      }

      if (hasUpper) {
        this.renderer.addClass(this.upper.nativeElement, 'valid');
      } else {
        this.renderer.removeClass(this.upper.nativeElement, 'valid');
      }

      if (hasLower) {
        this.renderer.addClass(this.lower.nativeElement, 'valid');
      } else {
        this.renderer.removeClass(this.lower.nativeElement, 'valid');
      }

      if (hasSpecialCharacter) {
        this.renderer.addClass(this.special.nativeElement, 'valid');
      } else {
        this.renderer.removeClass(this.special.nativeElement, 'valid');
      }

      if (hasMinLength) {
        this.renderer.addClass(this.eight.nativeElement, 'valid');
      } else {
        this.renderer.removeClass(this.eight.nativeElement, 'valid');
      }
    } else {
      this.renderer.removeClass(this.validations.nativeElement, 'show');
    }
  }

  verifyPassword(signupForm: FormGroup) {
    if (signupForm.touched) {
      if (signupForm.value?.password == signupForm.value?.confirmPassword) {
        this.renderer.addClass(this.passmatch.nativeElement, 'valid');
      } else {
        this.renderer.removeClass(this.passmatch.nativeElement, 'valid');
      }
    }
  }
}
