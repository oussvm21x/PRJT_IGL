import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { NotificationsComponent } from './components/patient/notifications-patient/notifications-patient.component';
import { ParametresComponent } from './components/patient/parametres-patient/parametres-patient.component';
import { LayoutComponent } from './components/patient/layout-patient/layout-patient.component';
import { ModifierPatientComponent } from './components/patient/dossier/dossier.component';

export const routes: Routes = [
    {
        path: 'patient',
        component:LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardMdcnComponent },
            { path: 'notifications', component: NotificationsComponent }, 
            { path: 'parametres', component: ParametresComponent }, 
            { path: 'dossier', component: ModifierPatientComponent }, 

        ],
        
    },
    { path: '', redirectTo: '/patient/dashboard', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  