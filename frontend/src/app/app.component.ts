import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardinfComponent } from './components/infermier/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarinfComponent } from './components/infermier/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardinfComponent,
  SidebarinfComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
