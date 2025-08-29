import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.services';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: { rate: number; count: number };
  image: string;
  category: string;
}

interface Category {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  dailyProducts: Product[] = [];
  isLoading: boolean = true;
  isLoadingDaily: boolean = true;
  cartCount$: Observable<number>;
  
  categories: Category[] = [
    { 
      name: 'Tea, Coffee & Drinks', 
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&w=200&q=80' 
    },
    { 
      name: 'Fruits & Vegetables', 
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&w=200&q=80' 
    },
    { 
      name: 'Dairy, Bread & Eggs', 
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&w=200&q=80' 
    },
    { 
      name: 'Chicken, Meat & Fish', 
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&w=200&q=80' 
    }
  ];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadDailyProducts();
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.http.get<Product[]>('https://fakestoreapi.com/products?limit=12')
      .subscribe({
        next: (response) => {
          this.products = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.products = this.getFallbackProducts();
          this.isLoading = false;
        }
      });
  }

  loadDailyProducts(): void {
    this.isLoadingDaily = true;
    this.http.get<Product[]>('https://fakestoreapi.com/products?limit=3')
      .subscribe({
        next: (response) => {
          this.dailyProducts = response;
          this.isLoadingDaily = false;
        },
        error: (error) => {
          console.error('Error loading daily products:', error);
          this.dailyProducts = this.getFallbackProducts().slice(0, 3);
          this.isLoadingDaily = false;
        }
      });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  private getFallbackProducts(): Product[] {
    return [
      { 
        id: 1, 
        title: 'Sample Backpack', 
        price: 49.99, 
        rating: { rate: 4.3, count: 120 }, 
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 
        category: 'bags' 
      },
      { 
        id: 2, 
        title: 'Sample T-Shirt', 
        price: 19.99, 
        rating: { rate: 4.5, count: 250 }, 
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 
        category: 'clothing' 
      }
    ];
  }
}