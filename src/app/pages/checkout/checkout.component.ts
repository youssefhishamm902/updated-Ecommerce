import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder)  //formBuilder has better performance than using the formGroup direct.
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)


  paymentForm !: FormGroup;

  cartId : string='';
  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      details: this.formBuilder.control(null, [Validators.required]),
      phone: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city: this.formBuilder.control(null, [Validators.required])
    })

    this.activatedRoute.paramMap.subscribe({
      next:(res) => {
        this.cartId =res.get('id')!   //take the id of the cart from the route to pass it to the API tp proceed to payment
         console.log(this.cartId);
      }
    });

  }

  submitForm():void{
    console.log(this.paymentForm.value)

    this.paymentService.checkoutSession(this.cartId, this.paymentForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status === "success"){
          window.open(res.session.url, '_self');  //from js to open the url located in the api 
          //self will open it on the same page
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
    
    
  }


}

