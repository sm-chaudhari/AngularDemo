import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
      const user = localStorage.getItem('user');
      if (user) {
        return true
      }

      if(state.url.includes('/users')) 
      {
        this.router.navigate(['/login']);
      } 
      else if(state.url.includes('/users') && !user.hasOwnProperty('users')) 
      {
        this.router.navigate(['/login']);
      } 
      else 
      {
        this.router.navigate(['/login']);
      }
      return false;
  }
}
