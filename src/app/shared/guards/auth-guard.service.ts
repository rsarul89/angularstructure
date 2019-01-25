import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthModel } from "../../model/auth.model";
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    private user: AuthModel;
    subscription: Subscription;
    constructor(public router: Router, public authService: AuthService) {
        this.subscription = authService.LoggedInUser().subscribe(user => {
           this.user = user;
        });
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.user == null) {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        this.subscription.unsubscribe();
        return true;
    }
}