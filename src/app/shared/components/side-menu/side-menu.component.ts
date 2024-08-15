import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightToBracket, faBarsStaggered, faList, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  protected loginService = inject(LoginService);

  protected expanded: boolean = true;
  protected isLargeScreen: boolean = false;
  protected faList = faList;
  protected faArrow = faArrowRightToBracket;

  protected menu = [
    {
      label: 'Dashboard',
      routerLink: '/dashboard',
      icon: faTableColumns
    },
    {
      label: 'Tarefas',
      routerLink: '/tasks',
      icon: faBarsStaggered
    }
  ]

  constructor(private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])   
      .subscribe(result => {
        this.isLargeScreen = result.matches;
      });
  }

  protected expand() {
    this.expanded = !this.expanded
  }

  protected logout() {
    this.loginService.logout()
  }
}
