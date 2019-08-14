import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from './user';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/Controller';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getServerUsers(): Observable<User[]> {
    // TODO: send the message _after_ fetching the users
    this.messageService.add('UserService: fetched users');
    return this.http.get<User[]>(this.url, {params: new HttpParams().set('action', 'GetUsers')});
  }
  setFirstName(user: User): void {
    const body = new HttpParams().append('firstName', user.firstName).append('userId', user.userId);
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.url + '?action=SetUserAppFirstName&firstName=' + user.firstName + '&userId=' +
      user.userId, body, {headers: header}).subscribe((res) => console.log(res), (err) => console.log(err));
  }
  setLastName(user: User): void {
    const body = new HttpParams().append('lastName', user.lastName).append('userId', user.userId);
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.url + '?action=SetUserAppLastName&lastName=' + user.lastName + '&userId=' +
      user.userId, body, {headers: header}).subscribe((res) => console.log(res), (err) => console.log(err));
  }
  setStatus(user: User): void {
    const body = new HttpParams().append('state', user.userStatus).append('userId', user.userId);
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<any>(this.url + '?action=SetUserAppStatus&userStatus=' + user.userStatus + '&userId=' +
      user.userId, body, {headers: header}).subscribe((res) => console.log(res), (err) => console.log(err));
  }
  getUser(userId: string): Observable<User> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`UserService: fetched user userId=${userId}`);
    return this.http.get<User>(this.url + '?action=GetSpecificUser&userId=' + userId);
  }
}
