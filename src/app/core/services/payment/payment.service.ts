import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpclient:HttpClient) { }
  myToken = localStorage.getItem('myToken')!;


  checkoutSession(id: string, shippingData: object): Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`, 
      { "shippingAddress": shippingData }
    );

  }

}