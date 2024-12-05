import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): any {

		let Unique_id = localStorage.getItem("Unique_id");
		if (Unique_id != undefined) {
			return true;
		} else {
      this.signout();
		}
    // return true
     

	}

  signout() {
		localStorage.clear();
		this.router.navigate(["/login"]).then(() => {
			window.location.reload();
		});
	}
}

