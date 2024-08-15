import { Component } from '@angular/core';
import { SearchComponent } from './shared/components/search/search.component';
import { SideMenuComponent } from "./shared/components/side-menu/side-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task Manager';
}
