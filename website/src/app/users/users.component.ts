import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

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
}
