import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
//import the Angular Guard
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: 'bonuses', canActivate:[AuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', canActivate:[AuthGuard], loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'profile', canActivate:[AuthGuard], loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule) },
  { path: 'contacts', canActivate:[AuthGuard], loadChildren: () => import('./contacts-page/contacts-page.module').then(m => m.ContactsPageModule) }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }