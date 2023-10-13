import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Auth/signin/signin.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { HomeComponent } from './Layout/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo:'home', pathMatch:'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
