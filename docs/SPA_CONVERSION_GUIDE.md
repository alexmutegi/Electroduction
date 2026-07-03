# Ecommerce SPA Conversion Guide

This document provides a step-by-step guide to convert the ecommerce demo into a full Single Page Application (SPA).

## Overview

The current ecommerce page is a static HTML file with vanilla JavaScript. We'll convert it into a modular SPA with:
- Client-side routing (no page reloads)
- Component-based architecture
- State management
- Dynamic imports
- API integration

## Architecture

```
src/
├── index.html
├── assets/
│   ├── styles/
│   │   ├── main.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── product-grid.css
│   │   │   └── cart.css
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── store.js
│   │   ├── api.js
│   │   └── components/
│   │       ├── Header.js
│   │       ├── ProductGrid.js
│   │       ├── Cart.js
│   │       ├── Checkout.js
│   │       └── ProductDetail.js
```

## Step-by-Step Implementation

### Step 1: Set up Module System

```javascript
// src/assets/js/app.js
import Router from './router.js';
import Store from './store.js';
import Header from './components/Header.js';

class App {
  constructor() {
    this.store = new Store();
    this.router = new Router(this.store);
    this.init();
  }

  init() {
    this.router.navigate('home');
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.slice(1) || 'home';
      this.router.navigate(route);
    });
  }
}

new App();
```

### Step 2: Create Router

```javascript
// src/assets/js/router.js
export default class Router {
  constructor(store) {
    this.store = store;
    this.routes = {
      'home': () => this.renderHome(),
      'product/:id': (id) => this.renderProduct(id),
      'checkout': () => this.renderCheckout(),
      'order-confirmation': () => this.renderConfirmation()
    };
  }

  navigate(route) {
    const handler = this.routes[route];
    if (handler) {
      handler();
    }
  }

  renderHome() {
    // Render product grid
  }

  renderProduct(id) {
    // Render product detail page
  }

  renderCheckout() {
    // Render checkout page
  }

  renderConfirmation() {
    // Render order confirmation
  }
}
```

### Step 3: Implement State Management

```javascript
// src/assets/js/store.js
export default class Store {
  constructor() {
    this.state = {
      products: [],
      cart: [],
      filters: { category: 'all', search: '' },
      currentProduct: null
    };
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach(obs => obs(this.state));
  }

  addToCart(productId) {
    const product = this.state.products.find(p => p.id === productId);
    const existing = this.state.cart.find(c => c.id === productId);
    
    if (existing) {
      existing.quantity++;
    } else {
      this.state.cart.push({ ...product, quantity: 1 });
    }
    
    this.notify();
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(c => c.id !== productId);
    this.notify();
  }

  getFilteredProducts() {
    return this.state.products.filter(p => {
      const categoryMatch = this.state.filters.category === 'all' || 
                           p.category === this.state.filters.category;
      const searchMatch = !this.state.filters.search ||
                         p.name.toLowerCase().includes(this.state.filters.search);
      return categoryMatch && searchMatch;
    });
  }
}
```

### Step 4: Create Components

```javascript
// src/assets/js/components/ProductGrid.js
export default class ProductGrid {
  constructor(store) {
    this.store = store;
    this.store.subscribe(() => this.render());
  }

  render() {
    const products = this.store.getFilteredProducts();
    const html = products.map(p => `
      <div class="product-card" onclick="navigateTo('product/${p.id}')">
        <div class="product-image">${p.icon}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">$${p.price}</div>
        <button onclick="app.store.addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join('');
    
    document.getElementById('products').innerHTML = html;
  }
}
```

## Features to Implement

1. **Client-side Routing**: Hash-based or History API
2. **Product Detail Page**: Show full product info with reviews
3. **Advanced Filtering**: Multiple filters, sorting, pagination
4. **Checkout Flow**: Address, payment method selection
5. **Order Management**: View past orders
6. **User Accounts**: Register, login, wishlist
7. **Animations**: Smooth transitions between pages

## Build Tools (Optional)

For production, use:
- **Webpack** or **Vite** for bundling
- **Babel** for ES6+ transpilation
- **PostCSS** for CSS processing
- **Testing** with Jest/Vitest

## Migration Path

1. Start with home page and product grid
2. Add product detail page
3. Implement cart page
4. Build checkout flow
5. Add user authentication
6. Optimize with caching and prefetching

## Performance Optimizations

- Code splitting by route
- Lazy loading images
- Service Worker for offline support
- IndexedDB for offline cart
- API response caching
