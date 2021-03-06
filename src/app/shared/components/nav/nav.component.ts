import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  keyframes,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NavToggleMenu } from 'src/app/core/models/nav-toggle-menu.model';


@Component({
  // tslint:disable-next-line:components-selector
  selector: 'ensino-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('toggleModulesPanel', [
      transition(':enter', [
        animate(
          '150ms ease-out',
          keyframes([
            style({ offset: 0.0, transform: 'translateY(-10%)', opacity: 0 }),
            style({ offset: 1.0, transform: 'translateY(0%)', opacity: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  isModulesPanelOpen = false;
  @Input() configNav: NavToggleMenu[];

  constructor() {}

  ngOnInit(): void {}

  toggleModulesPanel(): void {
    this.isModulesPanelOpen = !this.isModulesPanelOpen;
  }
}
