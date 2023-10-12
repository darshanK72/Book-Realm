import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

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
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HeroComponent } from './Components/hero/hero.component';
import { NgxSplideModule } from 'ngx-splide';
import { ListComponent } from './Components/list/list.component';
import { LargeBannersComponent } from './Components/large-banners/large-banners.component';
import { SmallBannersComponent } from './Components/small-banners/small-banners.component';

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
    SidebarComponent,
    HeroComponent,
    ListComponent,
    LargeBannersComponent,
    SmallBannersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSplideModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
