import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardpharmaComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarpharmaComponent } from './components/pharmacie/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardpharmaComponent,
  SidebarpharmaComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
