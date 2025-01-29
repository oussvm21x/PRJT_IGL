import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardpatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarComponent } from './components/patient/sidebar-patient/sidebar-patient.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardpatientComponent,
  SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
