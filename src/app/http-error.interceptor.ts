import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ToastService} from './shared/services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    resquest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(resquest).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Mensagem: ${error.error.message}`;
          this.injector.get(ToastService).show({
            message: errorMessage,
            type: 'error',
          });
        } else {
          // server-side error
          errorMessage = `${error.error.message}`;
          this.injector.get(ToastService).show({
            message: errorMessage,
            type: 'error',
          });
        }
        return throwError(errorMessage);
      })
    );
  }
}
