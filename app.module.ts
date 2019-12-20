import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
// import CanvasJS from 'canvasjs';

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

@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/auth']
      }
    }),
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ChartsModule
    // CanvasJS
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
