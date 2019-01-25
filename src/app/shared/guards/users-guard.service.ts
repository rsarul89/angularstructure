import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthModel } from "../../model/auth.model";
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class UserGuardService implements CanActivate {
    private user: boolean = false;
    constructor(public router: Router, public authService: AuthService) {
        authService.IsLoggedIn().subscribe(data => {
            this.user = data;
        });
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //const expectedRole = route.data.expectedRole;
        if (this.user == false) {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }
}