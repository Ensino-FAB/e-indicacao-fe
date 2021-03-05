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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((e: HttpErrorResponse) => {
        let errorMessage = '';
        if (e.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Mensagem: ${e.error.message}`;
          this.injector.get(ToastService).show({
            message: errorMessage,
            type: 'error',
          });
        } else {
          // server-side error
          errorMessage = `${e.error.message}`;
          if (e.status === 401 || e.status === 403) {
            errorMessage = 'Acesso não autorizado'
          }

          this.injector.get(ToastService).show({
            message: errorMessage,
              type: e.status === 428? 'alert': 'error',
        });
        }
        return throwError(errorMessage);
      })
    );
  }
}
