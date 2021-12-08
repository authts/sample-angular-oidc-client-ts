import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './core/components/home.component';
import { SigninCallbackComponent } from './core/components/signin-callback.component';

// @Injectable({ providedIn: 'root' })
// export class SignInCallback implements CanActivate {
//   constructor( private readonly router:Router,private readonly authServivce:AuthService,private readonly applicationRef:ApplicationRef) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree> {
//     console.warn('SigninCallback.canActivate');
//     const tree: UrlTree = this.router.parseUrl('/');
//     return from( this.authServivce.userManager?.signinCallback() ).pipe(
//       tap( () => this.applicationRef.components[0].instance.refresh() ),
//       map(() => tree),
//       catchError(() => of(tree) )
//     );
//   }
// }

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin-callback', component: SigninCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
