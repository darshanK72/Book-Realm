import { Injectable } from '@angular/core';
import {SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl:string = environment.authUrl;
  
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(private authService: SocialAuthService,private http:HttpClient) { 
     this.authService.authState.subscribe((user) => {
      console.log(user)
      this.extAuthChangeSub.next(user);
    })
  }

  signInWithGoogle = (user:SocialUser) => {
    this.http.post(`${this.authUrl}/auth/google-signin`,user).subscribe(data => {
      console.log(data);
    })
  }

  signUpWithGoogle = (user:SocialUser) => {
    this.http.post(`${this.authUrl}/auth/google-signup`,user).subscribe(data => {
      console.log(data);
    })
  }
  
}
