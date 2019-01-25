import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Injectable()
export class AfterLoginGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
      ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .pipe(
                take(1),
                map((isLoggedIn: any) => {
                    console.log('Auth guard isLoggedIn: ', isLoggedIn);
                    if (isLoggedIn) {
                        // Redirect to appropriate dashboard based on whether it's admin or user
                        this.router.navigate(['/admin/dashboard']);
                        return false;
                    } 
                    return true;
                })
            )
    }
}