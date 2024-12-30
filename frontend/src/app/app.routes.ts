import { Routes } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { SettingsComponent } from './components/settings/settings.component';


export const routes: Routes = [
  {
    path: '',
    component: SideBarComponent, // Sidebar is the layout container
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' }, // Redirect to dashboard for unknown paths
];