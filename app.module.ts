import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

//JWT module
import { JwtModule } from '@auth0/angular-jwt';

//function that will retrieve the token
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
registerLocaleData(localeRu);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent,
    ContactsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'localhost:8000', 
          'localhost:8000/bonuses', 
          'localhost:8000/home', 
          'localhost:8000/profile', 
          'localhost:8000/contacts'
        ],
        blacklistedRoutes: ['localhost:8000/api/auth']
      }
    }),
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
