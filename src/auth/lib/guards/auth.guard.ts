import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { PessoaService } from '../../../app/services/pessoa.service';
import { UserService } from '../../../app/shared/services/user.service';
import { Pessoa } from '../../../app/models/pessoa.model';
import { User } from '../../../app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivateChild {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected personService: PessoaService,
    protected userService: UserService
  ) {
    super(router, keycloak);
  }

  private handleUserRoles(requiredRoles): boolean {
    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.every((role) => this.roles.includes(role))) {
      this.router.navigate(['403']);
      return false;
    }

    // Allow the user to proceed if all the required roles are present.
    return true;
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      try {
        if (!this.userService.user) {
          const nrCpf = this.keycloak.getUsername();

          const person: Pessoa = await this.personService
            .findByCpf(nrCpf)
            .toPromise();

          const user: User = {
            id: person.id,
            nome: person.nome,
            nrCpf: person.nrCpf,
            organizacao: person.organizacao,
            roles: this.keycloak.getUserRoles(true),
          };

          this.userService.user = user;
        }
      } catch (err) {
        this.userService.user = {
          id: null,
          nome: 'Usuário não identificado',
          nrCpf: null,
          organizacao: null,
          roles: this.keycloak.getUserRoles(true),
        };
      }
    }

    return this.handleUserRoles(route.data?.roles);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.handleUserRoles(route.data?.roles);
  }
}
