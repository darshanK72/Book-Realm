import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
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
import { GenreComponent } from './Layout/genre/genre.component';
import { SubgenreComponent } from './Layout/subgenre/subgenre.component';
import { FilterComponent } from './Layout/filter/filter.component';
import { DetailComponent } from './Layout/detail/detail.component';
import { SearchComponent } from './Components/search/search.component';

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
