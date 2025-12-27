import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { ListComponent } from './Components/Home/list/list.component';
import { SmallBannersComponent } from './Components/Home/small-banners/small-banners.component';
import { MediumBannersComponent } from './Components/Home/medium-banners/medium-banners.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { SidebarComponent } from './Components/Profile/sidebar/sidebar.component';
import { AddressComponent } from './Components/Profile/address/address.component';
import { ChangePassComponent } from './Components/Profile/change-pass/change-pass.component';
import { MyOrdersComponent } from './Components/Profile/my-orders/my-orders.component';
import { MyProfileComponent } from './Components/Profile/my-profile/my-profile.component';
import { MyReviewsComponent } from './Components/Profile/my-reviews/my-reviews.component';
import { SearchComponent } from './Components/Layout/search/search.component';
import { HeroComponent } from './Components/Home/hero/hero.component';
import { AboutComponent } from './Components/Profile/about/about.component';
import { ContactComponent } from './Components/Profile/contact/contact.component';
import { FaqsComponent } from './Components/Profile/faqs/faqs.component';
import { HelpComponent } from './Components/Profile/help/help.component';
import { PrivacyComponent } from './Components/Profile/privacy/privacy.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { AdminComponent } from './Components/Dashboard/admin/admin.component';
import { AuthorComponent } from './Components/Dashboard/author/author.component';
import { PublisherComponent } from './Components/Dashboard/publisher/publisher.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { WishlistComponent } from './Components/Wishlist/wishlist/wishlist.component';
import { DetailComponent } from './Components/Book/detail/detail.component';
import { FilterComponent } from './Components/Book/filter/filter.component';
import { GenreComponent } from './Components/Book/genre/genre.component';
import { SubgenreComponent } from './Components/Book/subgenre/subgenre.component';
import { SigninComponent } from './Components/Auth/signin/signin.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSplideModule } from 'ngx-splide';
import { AppStore } from './Store/app.store';
import { BookEffects } from './Store/book/book.effects';
import { GenreEffects } from './Store/genre/genre.effects';
import { SubgenreEffects } from './Store/subgenre/subgenre.effects';
import { CardComponent } from './Components/Home/card/card.component';
import { FullBannerComponent } from './Components/Home/full-banner/full-banner.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GoogleLoginProvider,
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './Store/auth/auth.effects';
import { SpinnerComponent } from './Components/Layout/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedEffects } from './Store/shared/shared.effects';
import { NgToastModule } from 'ng-angular-popup';
import { HomeEffects } from './Store/home/home.effects';
import { CategoryGridComponent } from './Components/Home/category-grid/category-grid.component';
import { FeaturedCollectionsComponent } from './Components/Home/featured-collections/featured-collections.component';
import { TrendingSectionComponent } from './Components/Home/trending-section/trending-section.component';
import { NewsletterComponent } from './Components/Home/newsletter/newsletter.component';
import { TrustIndicatorsComponent } from './Components/Home/trust-indicators/trust-indicators.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    SmallBannersComponent,
    MediumBannersComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddressComponent,
    ChangePassComponent,
    MyOrdersComponent,
    MyProfileComponent,
    MyReviewsComponent,
    SearchComponent,
    HeroComponent,
    AboutComponent,
    ContactComponent,
    FaqsComponent,
    HelpComponent,
    PrivacyComponent,
    ProfileComponent,
    AdminComponent,
    AuthorComponent,
    PublisherComponent,
    CartComponent,
    WishlistComponent,
    DetailComponent,
    FilterComponent,
    GenreComponent,
    SubgenreComponent,
    SigninComponent,
    SignupComponent,
    CardComponent,
    FullBannerComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSplideModule,
    NgxSpinnerModule,
    NgToastModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    CategoryGridComponent,
    FeaturedCollectionsComponent,
    TrendingSectionComponent,
    NewsletterComponent,
    TrustIndicatorsComponent,
    StoreModule.forRoot(AppStore),
    EffectsModule.forRoot([AuthEffects, HomeEffects, SharedEffects, BookEffects, GenreEffects, SubgenreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
