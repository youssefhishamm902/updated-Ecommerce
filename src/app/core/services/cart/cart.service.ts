import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient : HttpClient) { }

  myToken = localStorage.getItem('myToken')!;

  addProductToCart(id: string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, 

      {"productId": id },


      {
        headers: {
          token : this.myToken
        }
      }


    );
  }

  getCartItems(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${itemId}`);
  }
}
