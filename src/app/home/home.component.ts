import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.services';
import { Observable } from 'rxjs'; 

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
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
  cartCount$: Observable<number>; // Define it as Observable

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
    // Initialize in constructor
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
    this.http.get<{products: Product[]}>('https://dummyjson.com/products?limit=12')
      .subscribe({
        next: (response) => {
          this.products = response.products;
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
    this.http.get<{products: Product[]}>('https://dummyjson.com/products/category/groceries?limit=3')
      .subscribe({
        next: (response) => {
          this.dailyProducts = response.products;
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
        title: 'Fresh Organic Bananas',
        price: 2.99,
        discountPercentage: 15,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&w=300&q=80',
        category: 'fruits'
      },
      {
        id: 2,
        title: 'Whole Milk 1L',
        price: 3.49,
        discountPercentage: 10,
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&w=300&q=80',
        category: 'dairy'
      },
      {
        id: 3,
        title: 'Fresh Bread Loaf',
        price: 2.79,
        discountPercentage: 0,
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&w=300&q=80',
        category: 'bakery'
      },
      {
        id: 4,
        title: 'Organic Eggs (12 pack)',
        price: 4.99,
        discountPercentage: 20,
        rating: 4.7,
        thumbnail: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&w=300&q=80',
        category: 'dairy'
      },
      {
        id: 5,
        title: 'Premium Coffee Beans',
        price: 12.99,
        discountPercentage: 25,
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&w=300&q=80',
        category: 'beverages'
      },
      {
        id: 6,
        title: 'Fresh Tomatoes',
        price: 1.99,
        discountPercentage: 5,
        rating: 4.3,
        thumbnail: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=300&q=80',
        category: 'vegetables'
      }
    ];
  }
}