import { CartService } from './../../core/services/cart/cart.service';
import { ProductsService } from './../../core/services/product/products.service';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../shared/pipes/search.pipe";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  imports: [CarouselModule, CommonModule, RouterLink, UpperCasePipe, CurrencyPipe, FormsModule, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toasterService = inject(ToastrService);
  private readonly ngxSpinner = inject(NgxSpinnerService);

  myProducts: IProduct[] = [];
  myCategories: Icategory[] = [];
  searchItem: string = '';


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true,
    stagePadding: 0,
    margin: 10
  }



  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true
  }



callProducts(){
   this.productsService.getProducts().subscribe({

    next:(res) => {
      console.log(res.data);
      this.myProducts = res.data;
    },
    error:(err) => {
      console.error(err);
    }
  });
}

callCategories(){
   this.categoriesService.getCategories().subscribe({

    next:(res) => {
      console.log('Categories API Response:', res);
      console.log('Categories data:', res.data);
      this.myCategories = res.data || [];
      console.log('myCategories array:', this.myCategories);
      console.log('myCategories length:', this.myCategories.length);
      
      // Log the first category to see the structure
      if (this.myCategories.length > 0) {
        console.log('First category:', this.myCategories[0]);
      }
      
      // Trigger change detection to update the carousel
      this.cdr.detectChanges();
    }
  });
}

 ngOnInit(): void {
  this.callProducts();
  this.callCategories();
 }



 addProductToCart(id: string):void{
  this.ngxSpinner.show()
  this.cartService.addProductToCart(id).subscribe({
    next:(res) => {
      console.log(res);
      this.toasterService.success(res.message, 'FreshCart', {progressBar:true , newestOnTop: false});
      this.ngxSpinner.hide();
    }
  });

  
 }
}