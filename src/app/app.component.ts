import { NavToggleMenu } from './core/models/nav-toggle-menu.model';
import { UserService } from './shared/services/user.service';
import { Component, OnDestroy, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

import {
  trigger,
  keyframes,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

import { Subscription } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moduleChanged', [
      transition('* => *', [
        // When the item is changed
        query('.main-header-jet', [animate(0, style({ opacity: 1 }))]),
        animate(
          450,
          keyframes([
            style({ offset: 0.0, transform: 'translateX(-100%)' }),
            style({ offset: 1.0, transform: 'translateX(0%)' }),
          ])
        ),
        query('.main-header-jet', [
          animate(
            300,
            keyframes([
              style({ opacity: 1, offset: 0, transform: 'translateX(0%)' }),
              style({
                opacity: 0.9,
                offset: 0.7,
                transform: 'translateX(245%)',
              }),
              style({
                opacity: 0,
                offset: 1.0,
                transform: 'translateX(350%)',
              }),
            ])
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnDestroy, OnInit {
  // tslint:disable-next-line:variable-name
  private _sessionInterval: any;
  tokenDuration: moment.Duration;
  title = 'E-Ingresso';
  subs$: Subscription[] = [];
  module: string;
  animate = false;
  configNav: NavToggleMenu[] = [
    {
      href: '#',
      srcImage: 'assets/images/siga-logo.png',
      title: 'Cursos Indicação',
    },
  ];

  constructor(
    private router: Router,
    public keycloak: KeycloakService,
    public userService: UserService
  ) {
    this.subs$.push(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe((e: NavigationEnd) => {
          this.animate = e.url !== '/';
          this.module = e.url.split('/')[1];
        })
    );

    this.refreshTokenTime();
  }
  ngOnInit(): void {
    try {
      let userDetails = this.keycloak.getKeycloakInstance().tokenParsed;
      console.log('detalhes', userDetails)
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }

  handleLogout(): void {
    this.keycloak.logout().then((res) => {
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
    clearInterval(this._sessionInterval);
  }

  handleUserName(): string {
    return this.userService.user?.nome
      .split(' ')
      .map((name) => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`)
      .join(' ');
  }

  @HostListener('document:click')
  refreshTokenTime(): void {
    if (
      !this.tokenDuration ||
      Math.round(this.tokenDuration.asMinutes()) <= 300
    ) {
      this.keycloak.updateToken(-1).then((refreshed) => {
        if (refreshed) {
          const kc = this.keycloak.getKeycloakInstance();

          moment.locale('pt-br');
          const currentTime = moment().unix();

          const diffTime = kc.tokenParsed.exp + kc.timeSkew - currentTime;
          const interval = 1000;

          this.tokenDuration = moment.duration(diffTime, 's');

          if (diffTime > 0) {
            if (this._sessionInterval) {
              clearInterval(this._sessionInterval);
            }

            this._sessionInterval = setInterval(() => {
              if (this.keycloak.isTokenExpired()) {
                this.handleLogout();
              }

              this.tokenDuration = moment.duration(
                this.tokenDuration.asMilliseconds() - interval,
                'ms'
              );
            }, interval);
          }
        }
      });
    }
  }
}
