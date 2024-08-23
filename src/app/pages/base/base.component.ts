import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, SideMenuComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  urlImg: string = 'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg'
}
