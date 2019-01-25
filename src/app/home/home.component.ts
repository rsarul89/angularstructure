import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthModel } from '../model/auth.model';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser: AuthModel;
  users: AuthModel[] = [];

  constructor(private userService: AuthService) {
    userService.LoggedInUser().subscribe(user => {
      this.currentUser = user;
    });
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAllUsers().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
