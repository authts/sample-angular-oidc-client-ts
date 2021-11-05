import { ApplicationRef, Injectable, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from "@angular/router";
import { Observable, from, tap, map, catchError, of } from "rxjs";
import { AuthService } from "./core/services/auth.service";

@Injectable({ providedIn: 'root' })
export class SignInCallback implements CanActivate {
  constructor( private readonly router:Router,private readonly authServivce:AuthService,private readonly applicationRef:ApplicationRef) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree> {
    console.warn('SigninCallback.canActivate');
    const tree: UrlTree = this.router.parseUrl('/');
    return from( this.authServivce.userManager?.signinCallback() ).pipe(
      tap( () => this.applicationRef.components[0].instance.refresh() ),
      map(() => tree),
      catchError(() => of(tree) )
    );
  }
}

export const routes: Routes = [
  { path: 'signin-callback', canActivate: [SignInCallback] },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
    constructor() {}
  }