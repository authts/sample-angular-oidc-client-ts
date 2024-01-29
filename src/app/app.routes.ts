import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home.component';
import { SigninCallbackComponent } from './core/components/signin-callback.component';

// export const signInCallBack: CanActivateFn = () => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const applicationRef = inject(ApplicationRef);
//
//   console.warn('SigninCallback.canActivate');
//   const tree = router.parseUrl('/');
//   return from(authService.userManager.signinCallback()).pipe(
//     tap(() => applicationRef.components[0].instance.refresh()),
//     map(() => tree),
//     catchError(() => of(tree))
//   );
// };

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin-callback', component: SigninCallbackComponent },
];
