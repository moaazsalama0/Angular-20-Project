import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { CartService } from '../services/cart.services'; 

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Interface for products grouped by category
interface CategorizedProducts {
  [key: string]: Product[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule , RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = true;
  categorizedProducts: CategorizedProducts = {};
  // Define the order and names of categories to display
  categoryOrder: string[] = ['Clothing', 'Electronics', 'Jewelry'];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchAndCategorizeProducts();
  }

  fetchAndCategorizeProducts(): void {
    this.isLoading = true;
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe({
      next: (products) => {
        this.categorizedProducts = this.groupProductsByCategory(products);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  private groupProductsByCategory(products: Product[]): CategorizedProducts {
    const grouped: CategorizedProducts = {
      'Clothing': [],
      'Electronics': [],
      'Jewelry': []
    };

    for (const product of products) {
      if (product.category === "men's clothing" || product.category === "women's clothing") {
        grouped['Clothing'].push(product);
      } else if (product.category === 'electronics') {
        grouped['Electronics'].push(product);
      } else if (product.category === 'jewelery') {
        grouped['Jewelry'].push(product);
      }
    }
    return grouped;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    // Optional: Add a visual confirmation
    alert(`${product.title} added to cart!`);
  }
}