import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { thumbnail } from '../types/thumbnail';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getThumbnail(lastName: string): Observable<thumbnail> {
    return this.http.get<thumbnail>(
      'https://jsonplaceholder.typicode.com/photos/' + lastName.length
    );
  }
  register(user: User) {
    return this.http.post('https://jsonplaceholder.typicode.com/users', user);
  }
}
