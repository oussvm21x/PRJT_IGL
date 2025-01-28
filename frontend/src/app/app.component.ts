import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMdcnComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarComponent } from './components/patient/sidebar-patient/sidebar-patient.component';

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
