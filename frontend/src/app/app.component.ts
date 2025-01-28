import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NosChiffresComponent } from "./components/nos-chiffres/nos-chiffres.component";
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { SidebarComponent } from './components/medecin/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPageComponent, NosChiffresComponent,DashboardMdcnComponent,
  SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
