import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './shared/loader/loader/loader.service';
import { finalize } from 'rxjs';

let totalRequests = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  totalRequests++;
  loaderService.show();
  
  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        // Small delay to ensure smooth transition and avoid flickering
        setTimeout(() => loaderService.hide(), 300);
      }
    })
  );
};
