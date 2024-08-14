import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBarsStaggered, faList, faTableColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  protected expanded: boolean = true;
  protected faList = faList;

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

  protected expand() {
    this.expanded = !this.expanded
  }
}
