import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Components/Auth/signin/signin.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { DetailComponent } from './Components/Book/detail/detail.component';
import { FilterComponent } from './Components/Book/filter/filter.component';
import { GenreComponent } from './Components/Book/genre/genre.component';
import { SubgenreComponent } from './Components/Book/subgenre/subgenre.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { AdminComponent } from './Components/Dashboard/admin/admin.component';
import { AuthorComponent } from './Components/Dashboard/author/author.component';
import { PublisherComponent } from './Components/Dashboard/publisher/publisher.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { AboutComponent } from './Components/Profile/about/about.component';
import { AddressComponent } from './Components/Profile/address/address.component';
import { ChangePassComponent } from './Components/Profile/change-pass/change-pass.component';
import { ContactComponent } from './Components/Profile/contact/contact.component';
import { MyOrdersComponent } from './Components/Profile/my-orders/my-orders.component';
import { MyProfileComponent } from './Components/Profile/my-profile/my-profile.component';
import { MyReviewsComponent } from './Components/Profile/my-reviews/my-reviews.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { WishlistComponent } from './Components/Wishlist/wishlist/wishlist.component';
import { AuthGuard } from './Services/auth/auth.guard';
import { LogGuard } from './Services/auth/log.guard';


const routes: Routes = [
  {
    path: '', redirectTo:'home', pathMatch:'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'signin', component: SigninComponent,canActivate:[LogGuard]
  },
  {
    path: 'signup', component: SignupComponent,canActivate:[LogGuard]
  },
  {
    path: 'cart', component: CartComponent,canActivate:[AuthGuard]
  },
  {
    path: 'wishlist', component: WishlistComponent,canActivate:[AuthGuard]
  },
  {
    path: 'detail/:bookId', component: DetailComponent
  },
  {
    path: 'filter', component: FilterComponent
  },
  {
    path: 'genre/:id', component: GenreComponent
  },
  {
    path: 'sub-genre/:id', component: SubgenreComponent
  },
  {
    path: 'profile', component: ProfileComponent,children:[
      {
        path:'my-profile',component:MyProfileComponent
      },
      {
        path:'my-orders',component:MyOrdersComponent
      }, 
      {
        path:'my-reviews',component:MyReviewsComponent
      },
      {
        path: 'address',component:AddressComponent
      },
      {
        path: 'change-pass',component:ChangePassComponent
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'author', component: AuthorComponent
  },
  {
    path: 'publisher', component: PublisherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
