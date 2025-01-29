import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardMdcnComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarComponent } from './components/patient/sidebar-patient/sidebar-patient.component';
import { DashboardMdcnComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/pharmacie/sidebar/sidebar.component';
import { DashboardMdcnComponent } from './components/infermier/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/infermier/sidebar/sidebar.component';
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NosChiffresComponent } from "./components/nos-chiffres/nos-chiffres.component";
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardMdcnComponent,
  SidebarComponent,LandingPageComponent, NosChiffresComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
