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

  private _state: State = {
    page: 1,
    pageSize: 10
  };

  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
  }

  geUsers() {
    return this.http.get('http://localhost:8080/users?page=' + this.page  + '&size=' + this.pageSize);
  }

  addUser() {
    return this.http.post('http://localhost:8080/users', {}).subscribe(data => {
      // this.postId = data.id;
    });
  }

  deleteUsers(user_id: number) {
    return this.http.delete('http://localhost:8080/users/' + user_id).subscribe(data => {
      console.log(data);
    });
  }
}
