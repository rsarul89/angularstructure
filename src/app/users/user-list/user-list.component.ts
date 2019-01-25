import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from "../../model/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  constructor(private service: UserService) {
    this.service.getAllUsers(1).subscribe(
      (data: any) => { this.users = data as User[]; },
      (error: any) => { console.log(error); },
      () => { console.log('user service call completed'); });
  }

  ngOnInit() {
  }

}
