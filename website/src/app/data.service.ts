import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface State {
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  private state: State = {
    page: 1,
    pageSize: 10
  };

  get page() { return this.state.page; }
  set page(page: number) { this._set({page}); }

  get pageSize() { return this.state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  private _set(patch: Partial<State>) {
    Object.assign(this.state, patch);
  }

  geUsers() {
    return this.http.get('http://localhost:8080/users?page=' + this.page  + '&size=' + this.pageSize);
  }

  addUser(user: {}) {
    // after posting to the server its close connection
    return this.http.post('http://localhost:8080/users', user).subscribe(data => {
      console.log(data);
    });
  }

  deleteUsers(userId: number) {
    return this.http.delete('http://localhost:8080/users/' + userId).subscribe(data => {
      console.log(data);
    });
  }
}
