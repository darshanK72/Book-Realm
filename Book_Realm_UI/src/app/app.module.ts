import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
import { BookListComponent } from './Layout/book-list/book-list.component';
import { BookDetailsComponent } from './Layout/book-details/book-details.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { CartComponent } from './Layout/cart/cart.component';
import { WishlistComponent } from './Layout/wishlist/wishlist.component';
import { ProfileComponent } from './Layout/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookListComponent,
    BookDetailsComponent,
    SignupComponent,
    SigninComponent,
    CartComponent,
    WishlistComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
