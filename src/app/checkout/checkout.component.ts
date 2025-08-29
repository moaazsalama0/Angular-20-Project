import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService ,CartItem } from '../services/cart.services'; 

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  total = 0;
  

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  placeOrder() {
    alert("✅ Order placed successfully!");

    this.cartService.clearCart();
    this.router.navigate(['/']); // go to home page
  }
}
