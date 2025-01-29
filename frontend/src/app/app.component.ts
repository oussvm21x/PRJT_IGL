import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardpatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarpatientComponent } from './components/patient/sidebar-patient/sidebar-patient.component';
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NosChiffresComponent } from "./components/nos-chiffres/nos-chiffres.component";
// import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
// import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPageComponent, NosChiffresComponent,  DashboardpatientComponent,SidebarpatientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
