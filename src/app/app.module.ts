import { AuthenticationModule } from './core/authentication/authentication.module';
import { ServicesModule } from './core/services/services.module';
import { InterceptorsModule } from './core/interceptors/interceptors.module';
import { GuardsModule } from './core/guards/guards.module';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './core/interceptors/auth-http.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ComponentsModule,
    AuthenticationModule,
    GuardsModule,
    InterceptorsModule,
    ServicesModule,
    HttpClientModule,
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
