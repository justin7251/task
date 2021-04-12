import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DataService]
})
export class UsersComponent implements OnInit {
  users = [];
  total = 0;
  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.data.geUsers().subscribe((response: any) => {
      this.users = response.items;
      this.total = response.total;
    });
  }

  refreshPage() {
    this.data.geUsers().subscribe((response: any) => {
      this.users = response.items;
      this.total = response.total;
    });
  }

  delete (user_id: number) {
    this.data.deleteUsers(user_id);
    window.location.reload();
  }
}
