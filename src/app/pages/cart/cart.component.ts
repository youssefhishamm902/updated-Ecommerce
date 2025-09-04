import { Icart } from './../../../../Ecommmerce/src/app/shared/interfaces/icart';
import { CartService } from '../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly toasterService = inject(ToastrService);

  cartDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  deleteItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.toasterService.success('Item removed from cart successfully', 'FreshCart',{progressBar:true , newestOnTop: false});
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateQuantity(id: string, quantity: any): void {
    this.cartService.updateCartproductQuantity(id, quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.toasterService.success('Cart updated successfully', 'FreshCart',{progressBar:true , newestOnTop: false});
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

    deletecart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = {} as Icart; // Clear cart details after deletion
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}


