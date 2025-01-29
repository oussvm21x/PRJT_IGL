import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMdcnComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/pharmacie/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardMdcnComponent,
  SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
