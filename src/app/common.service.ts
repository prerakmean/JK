import { formatDate } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const httpOtions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  fileSizeUnit: number = 1024;
  public isApiSetup = false;
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data: { email: any; password: any }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, data, httpOtions);
  }
  signup(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/signup`, data, httpOtions);
  }

  getUserData(id: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/getUser`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
          user_id: id,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  updateUser(data: any, id: any,user_id:any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/updateUser/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
        user_id: user_id,
      }),
    });
  }

  getIngestionStatus(id: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/getIngestion`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
          user_id: id,
        }),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  addIngestion( id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/addIngestion`, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
        user_id: id,
      }),
    });
  }

  createTask(data: any, id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/addTask`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
        user_id: id,
      }),
    });
  }

  deleteUser(id: any, user_id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/deleteUser/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': JSON.parse(localStorage.getItem('token') || ''),
        user_id: user_id,
      }),
    });
  }

  displaySwal(message: any, title: any, type: any, okBtn = 'ok') {
    const date = new Date();
    const currentTime = formatDate(date, 'dd/MM/yyyy, hh:mm a', 'en');
    return Swal.fire({
      icon: type,
      title: title,
      html: `<h5>${message}</h5><h6 style= "color:#59178a; font-weight: 700;"></h6><h6 style="color: #e60094; font-weight: 700;">${currentTime}</h6>`,
      text: 'Something went wrong!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      // footer: '<a href="">Why do I have this issue?</a>'
    });
  }

  checkRoute() {
    let Unique_id = sessionStorage.getItem('Unique_id');
    if (Unique_id != undefined) {
      return true;
    } else {
      this.signout();
      return false;
    }
  }

  signout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  private loadData = new BehaviorSubject(false);
  currentLoadData = this.loadData.asObservable();

  changeLoadData(data: boolean) {
    this.loadData.next(data);
  }

  getFileSize(fileSize: number): number {
    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSize = parseFloat((fileSize / this.fileSizeUnit).toFixed(2));
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSize = parseFloat(
          (fileSize / this.fileSizeUnit / this.fileSizeUnit).toFixed(2)
        );
      }
    }

    return fileSize;
  }

  getFileSizeUnit(fileSize: number) {
    let fileSizeInWords = 'bytes';

    if (fileSize > 0) {
      if (fileSize < this.fileSizeUnit) {
        fileSizeInWords = 'bytes';
      } else if (fileSize < this.fileSizeUnit * this.fileSizeUnit) {
        fileSizeInWords = 'KB';
      } else if (
        fileSize <
        this.fileSizeUnit * this.fileSizeUnit * this.fileSizeUnit
      ) {
        fileSizeInWords = 'MB';
      }
    }

    return fileSizeInWords;
  }

  uploadMedia(formData: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(`http://yourapiurl`, formData, {
        headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event:any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }


}
