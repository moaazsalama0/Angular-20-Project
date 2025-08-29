import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'categories', component: CategoriesComponent },
  // { path: '**', redirectTo: '' },
];