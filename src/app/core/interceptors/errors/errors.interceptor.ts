import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  // logic on request...

const toastrService = inject(ToastrService);


return next(req).pipe( catchError((err)=> {
  console.log(err);     // pipe operators is from rxjs works with observable (next return observable). ThrowError is from RxJs as well is observable (can be returned with the pipe)
  toastrService.error(err.error.message, 'freshCart')
  return throwError(()=> err)// logic on response...
  })
);
};
