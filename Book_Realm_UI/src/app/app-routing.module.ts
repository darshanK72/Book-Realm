import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Layout/signin/signin.component';
import { SignupComponent } from './Layout/signup/signup.component';
import { HomeComponent } from './Layout/home/home.component';
import { CartComponent } from './Layout/cart/cart.component';
import { WishlistComponent } from './Layout/wishlist/wishlist.component';
import { DetailComponent } from './Layout/detail/detail.component';
import { FilterComponent } from './Layout/filter/filter.component';
import { ProfileComponent } from './Layout/profile/profile.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { MyReviewsComponent } from './Components/my-reviews/my-reviews.component';
import { AddressComponent } from './Components/address/address.component';
import { ChangePassComponent } from './Components/change-pass/change-pass.component';
import { GenreComponent } from './Layout/genre/genre.component';
import { SubgenreComponent } from './Layout/subgenre/subgenre.component';

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
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'wishlist', component: WishlistComponent
  },
  {
    path: 'detail', component: DetailComponent
  },
  {
    path: 'filter', component: FilterComponent
  },
  {
    path: 'genre', component: GenreComponent
  },
  {
    path: 'sub-genre', component: SubgenreComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
