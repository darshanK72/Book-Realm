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
    path: 'profile', component: ProfileComponent,children:[
      {
        path:'my-profile',component:MyProfileComponent
      },
      {
        path:'my-orders',component:MyOrdersComponent
      }, 
      {
        path:'my-reviews',component:MyReviewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
