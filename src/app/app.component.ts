import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  isLoggedIn: boolean = false;
  subscription: Subscription;
  constructor(private authService: AuthService, private cd: ChangeDetectorRef) {
    this.subscription = authService.IsLoggedIn().subscribe(data => {
      this.isLoggedIn = data;
      //this.cd.detectChanges();
    });
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
