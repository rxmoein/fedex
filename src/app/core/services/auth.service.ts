import { LoginResponseDTO } from '../models/authentication';
import { environment } from '../../../environments/environment';
import { StorageKeys } from '../models/local-storage';
import { CustomResponse } from '../models/response';
import { User } from '../models/user';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(identifier: string, password: string): Observable<CustomResponse<LoginResponseDTO>> {
    return this.http.post<CustomResponse<LoginResponseDTO>>(`${environment.authServiceURL}/auth/login`, { identifier, password });
  }

  forgot(email: string): Observable<CustomResponse<any>> {
    return this.http.post<CustomResponse<any>>(`${environment.authServiceURL}/auth/forgot-password`, { email });
  }

  reset(password: string, token: string): Observable<CustomResponse<any>> {
    return this.http.post<CustomResponse<any>>(`${environment.authServiceURL}/auth/reset-password`, { password, token }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  }

  register(email: string, password: string): Observable<CustomResponse<any>> {
    return this.http.post<CustomResponse<any>>(`${environment.authServiceURL}/auth/register`, { email, password });
  }

  updateMyUser(username: string, first_name: string, last_name: string): Observable<CustomResponse<any>> {
    return this.http.patch<CustomResponse<any>>(`${environment.authServiceURL}/users/me`, { username, first_name, last_name });
  }

  getMyUser(): Observable<CustomResponse<any>> {
    return this.http.get<CustomResponse<any>>(`${environment.authServiceURL}/users/me`);
  }

  updateToken(token: string) {
    localStorage.setItem(StorageKeys.AuthToken, token);
  }

  getToken() {
    return localStorage.getItem(StorageKeys.AuthToken);
  }

  checkUsernameAvailability(username: string) {
    return this.http.get<CustomResponse<any>>(`${environment.authServiceURL}/users/check/username/` + username);
  }

  getUsername(user?: User): string {
    let username = '';
    if (!user) {
      username = localStorage.getItem(StorageKeys.UserUsername) || '';
    } else {
      username = user.username || '';
    }
    return username || '';
  }


  getFirstName(user?: User): string {
    let firstName = '';

    if (!user) {
      firstName = localStorage.getItem(StorageKeys.UserFirstName) || '';
    } else {
      firstName = user.first_name || '';
    }

    if (!firstName) {
      return localStorage.getItem(StorageKeys.UserUsername) || 'N/A';
    }

    return firstName;
  }


  getFullName(user?: User): string {
    let firstName = '', lastName = '';

    if (!user) {
      firstName = localStorage.getItem(StorageKeys.UserFirstName) || '';
      lastName = localStorage.getItem(StorageKeys.UserLastName) || '';
    } else {
      firstName = user.first_name || '';
      lastName = user.last_name || '';
    }

    if (!firstName && !lastName) {
      return localStorage.getItem(StorageKeys.UserUsername) || 'N/A';
    }

    return `${firstName || ''} ${lastName || ''}`;
  }

  updateLocalUser(
    { id, firstName, lastName, roleId, status, username }: {
      id?: number,
      firstName?: string,
      lastName?: string,
      roleId?: number,
      status?: number,
      username?: string,
    }) {
    if (id) {
      localStorage.setItem(StorageKeys.UserId, String(id));
    }

    if (firstName) {
      localStorage.setItem(StorageKeys.UserFirstName, String(firstName));
    }

    if (lastName) {
      localStorage.setItem(StorageKeys.UserLastName, String(lastName));
    }

    if (roleId) {
      localStorage.setItem(StorageKeys.UserRoleId, String(roleId));
    }

    if (status) {
      localStorage.setItem(StorageKeys.UserStatus, String(status));
    }

    if (username) {
      localStorage.setItem(StorageKeys.UserUsername, String(username));
    }
  }

  logout(): void {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/authentication/signin']);
    }, 0);
  }
}
