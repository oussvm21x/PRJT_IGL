import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/infirmier/sidebar/sidebar.component';
import { DashboardInfirmierComponent } from './components/infirmier/dashboard-infirmier/dashboard-infirmier.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardInfirmierComponent,
  SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
