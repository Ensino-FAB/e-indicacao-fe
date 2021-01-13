import { SubNavModule } from './shared/components/sub-nav/sub-nav.module';
import { NavModule } from './shared/components/nav/nav.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IconModule,
  ButtonModule,
  DropmenuModule,
} from '@cca-fab/cca-fab-components-common';
import { environment } from '../environments/environment';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';

function initializeKeycloak(keycloak: KeycloakService): any {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENT_ID,
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri: environment.KEYCLOAK_REDIRECT_URI,
      },
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconModule,
    ButtonModule,
    SubNavModule,
    NavModule,
    DropmenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
