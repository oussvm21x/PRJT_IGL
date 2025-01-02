import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';

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
