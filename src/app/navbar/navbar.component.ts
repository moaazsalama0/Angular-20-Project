import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { CartService } from '../services/cart.services'; 

@Component({
  selector: 'app-navbar',
  standalone :true,
  imports: [CommonModule , RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class Navbar {
  cartCount$: any;
  isMenuOpen: boolean = false;
  constructor(private cartService: CartService, private router: Router) {
    this.cartCount$ = this.cartService.cartCount$;
  }


  viewCart() {
    this.router.navigate(['/cart']);
  }


}
