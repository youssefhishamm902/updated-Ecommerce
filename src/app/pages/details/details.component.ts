import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  prodID:any;
  prodData:IProduct | null = null;    //to solve the error once you open the page , it return the html once the API call is made.

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(
      {
        next:(res)=>{
         this.prodID = res.get('id');

          this.productsService.getSpecificProduct(this.prodID).subscribe({
            next:(res)=>{
              this.prodData = res.data;
              console.log( this.prodData);
            },
            error:(err)=>{
              console.error(err);
            }

          })

        }


      }
    )
  }

}
