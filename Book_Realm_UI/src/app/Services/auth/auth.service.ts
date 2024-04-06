import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/user';
import { SigninRequest } from 'src/app/Payloads/signinRequest';
import { SignupRequest } from 'src/app/Payloads/signupRequest';
import { signInSuccess } from 'src/app/Store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';

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
    private http: HttpClient,
    private store:Store<AppState>
  ) {}

  setAuthenticationState(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearAuthenticationState(){
    localStorage.removeItem('currentUser');
  }

  restoreAuthenticationState() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const data = JSON.parse(storedUser);
      this.store.dispatch(signInSuccess({ payload: {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        success: data.message,
      } }));
    }
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

  checkIfUserExists = (user: SocialUser) => {
    return this.http.post(`${this.authUrl}/auth/checkUserExists`, user);
  };
}
