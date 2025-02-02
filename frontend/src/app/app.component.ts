import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardpharmaComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarpharmaComponent } from './components/pharmacie/sidebar/sidebar.component';
import { DashboardpatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { SidebarpatientComponent } from './components/patient/sidebar-patient/sidebar-patient.component';
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NosChiffresComponent } from "./components/nos-chiffres/nos-chiffres.component";
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';
// import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
// import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';
import { DashboardinfComponent } from './components/infermier/dashboard-infirmier/dashboard-mdcn.component';
import { SidebarinfComponent } from './components/infermier/sidebar-infirmier/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  DashboardpharmaComponent,
  SidebarpharmaComponent
  ,DashboardMdcnComponent,SidebarComponent, LandingPageComponent, NosChiffresComponent,  DashboardpatientComponent,SidebarpatientComponent, DashboardinfComponent,
    SidebarinfComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
