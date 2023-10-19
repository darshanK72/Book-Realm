import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
import { SignupComponent } from './Layout/signup/signup.component';
import { SigninComponent } from './Layout/signin/signin.component';
import { CartComponent } from './Layout/cart/cart.component';
import { WishlistComponent } from './Layout/wishlist/wishlist.component';
import { ProfileComponent } from './Layout/profile/profile.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HeroComponent } from './Components/hero/hero.component';
import { NgxSplideModule } from 'ngx-splide';
import { ListComponent } from './Components/list/list.component';
import { LargeBannersComponent } from './Components/large-banners/large-banners.component';
import { SmallBannersComponent } from './Components/small-banners/small-banners.component';
import { GenreComponent } from './Layout/genre/genre.component';
import { SubgenreComponent } from './Layout/subgenre/subgenre.component';
import { FilterComponent } from './Layout/filter/filter.component';
import { DetailComponent } from './Layout/detail/detail.component';
import { SearchComponent } from './Components/search/search.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { MyReviewsComponent } from './Components/my-reviews/my-reviews.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { AddressComponent } from './Components/address/address.component';
import { ChangePassComponent } from './Components/change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
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
    GenreComponent,
    SubgenreComponent,
    FilterComponent,
    DetailComponent,
    SearchComponent,
    MyProfileComponent,
    MyReviewsComponent,
    MyOrdersComponent,
    AddressComponent,
    ChangePassComponent,
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
