import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string;

  constructor(
    private http: HttpClient) {

    this.baseUrl = environment.apiBaseUrl;
  }

  private setHttpParams(prefixo: string, setParamsFunction: any, filterParams: any): void {
    for (const property in filterParams) {
      if (filterParams.hasOwnProperty(property)) {
        if (filterParams[property] !== undefined &&
          filterParams[property] !== null &&
          filterParams[property] !== '') {

          let appendName = prefixo;
          appendName += property;

          if (Array.isArray(filterParams[property])) {
            for (const arrayItem in filterParams[property]) {
              if (filterParams[property][arrayItem]) {
                setParamsFunction(appendName, filterParams[property][arrayItem]);
              }
            }
          } else if (typeof filterParams[property].getMonth === 'function') {
            setParamsFunction(appendName, filterParams[property].toJSON());
          } else if (typeof (filterParams[property]) === 'object') {
            const subPrefixo = prefixo ? `${prefixo}.${property}.` : `${property}.`;
            this.setHttpParams(subPrefixo, setParamsFunction, filterParams[property]);
          } else {
            setParamsFunction(appendName, filterParams[property]);
          }
        }
      }
    }
  }

  public get(url: string, filterParams: any) {

    url = this.baseUrl + url;
    let params = new HttpParams();

    if (filterParams) {
      const setParamsFunction = (param: string, value: string): void => {
        params = params.append(param, value);
      };

      this.setHttpParams('', setParamsFunction, filterParams);
    }

    return this.http
      .get<any>(url, { params, headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .pipe(map(this.handleMap));
  }

  public post(url: string, postData: any) {

    url = this.baseUrl + url;

    return this.http
      .post<any>(url, postData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .pipe(map(this.handleMap));
  }

  public postFileResult(url: string, postData: any) {

    url = this.baseUrl + url;

    return this.http
      .post(url, postData,
        {
          headers: this.getHeaders(),
          responseType: 'blob'
        })
      .pipe(catchError(this.handleErrorBlob));

  }

  public put(url: string, putData: any) {
    url = this.baseUrl + url;

    return this.http
      .put<any>(url, putData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .pipe(map(this.handleMap));
  }

  public delete(url: string) {

    url = this.baseUrl + url;

    return this.http
      .delete<any>(url, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
      .pipe(map(this.handleMap));
  }

  private handleMap(r: any) {

    if ((r === undefined) || (r.status === undefined) || r.status.hasErro) {
      const undefinedErrorText = 'Ocorreu um erro inesperado';
      const mensagens = r.status.mensagens || [{ texto: undefinedErrorText, tipo: 'Erro' }];
      let text = '';

      mensagens.forEach((element: any) => {
        text += element.texto + '</br>';
      });

      throw new Error(text);
    } else {
      return r.data;
    }

  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message || error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //  `Backend returned code ${error.status}, ` +
      //  `body was: ${error.error}`);

      console.error(error.error.status);

    }
    // return an ErrorObservable with a user-facing error message
    let msg = '';
    if (error.error) {
      if (error.error.status) {
        if (error.error.status.mensagens) {

          error.error.status.mensagens.forEach((m: any) => {
            msg += m.texto + ';';
          });
        }
      }
    }

    return throwError(
      msg || error.message || error.error.message || 'Ocorreu um erro inesperado');
  }

  private handleErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();

    const obs = new Observable((observer: any) => {
      reader.onloadend = (e) => {
        const result = reader.result ?? '';
        const r = JSON.parse(result.toString());

        const undefinedErrorText = 'Ocorreu um erro inesperado';
        const mensagens = r.status.mensagens || [{ texto: undefinedErrorText, tipo: 'Erro' }];
        let text = '';
        mensagens.forEach((element: any) => {
          text += element.texto + '</br>';
        });

        observer.error(text);
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }
}

@Injectable()
export class UpdateDateHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' || req.method === 'PUT') {
      this.shiftDates(req.body);
    }
    return next.handle(req);
  }

  shiftDates(body: any) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = moment(value).format('YYYY-MM-DD[T]HH:mm:ss');
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
    }
  }
}
