import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/user';
import { SigninRequest } from 'src/app/Payloads/signinRequest';
import { SignupRequest } from 'src/app/Payloads/signupRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = environment.authUrl;

  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient
  ) {
    this.authService.authState.subscribe((user) => {

    });
  }

  signIn = (signinRequest: SigninRequest) => {
    return this.http.post(`${this.authUrl}/auth/signin`, signinRequest);
  };

  signInWithGoogle = (user: SocialUser) => {
    return this.http.post(`${this.authUrl}/auth/google-signin`, user);
  };

  signUp = (signupRequest: SignupRequest) => {
    return this.http.post(`${this.authUrl}/auth/signup`, signupRequest);
  };

  signUpWithGoogle = (user: SocialUser) => {
    return this.http.post(`${this.authUrl}/auth/google-signup`, user);
  };

  checkIfUserExists = (user:SocialUser) => {
    console.log(user);
    return this.http.post(`${this.authUrl}/auth/checkUserExists`, user);
  }
}
