import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationManagementService } from './authentication-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authservice: AuthenticationManagementService, private _router: Router) {}

  async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
    if (this.authservice.isLoggedIn()) {
      // Check user's role (e.g., contractor or client)
      const userRole = await this.authservice.getUserRole(); 
      console.log(userRole);
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
  

  

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state).then(canActivate => canActivate);
  }

  canLoad(
    _route: Route,
    _segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
