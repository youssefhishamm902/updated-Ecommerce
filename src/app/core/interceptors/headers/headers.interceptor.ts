import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // logic on request...


  if(localStorage.getItem('myToken')!== null){
    if(req.url.includes('cart') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders:{
          token : localStorage.getItem('myToken') !
        }
      })
    }
  }

  return next(req);   //Logic on response...
};
