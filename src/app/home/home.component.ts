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
  imports: [CommonModule, HttpClientModule , RouterModule],
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
      name: 'Clothes', 
      image: 'https://burst.shopifycdn.com/photos/clothes-on-a-rack-in-a-clothing-store.jpg?width=1000&format=pjpg&exif=0&iptc=0'
    },
    { 
      name: 'SSDs', 
      image: 'https://kixat.blob.core.windows.net/kixatweb/3262d0f0-1fe0-44a8-a292-d10fa78c6727.jpg' 
    },
    { 
      name: 'Jewelry', 
      image: 'https://images.squarespace-cdn.com/content/v1/5984f3d103596ea150c48006/1512166175752-1LSM80BFZA1E1RAM4671/gold.jpg' 
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