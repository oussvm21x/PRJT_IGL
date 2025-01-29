import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/infermier/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsComponent } from './components/infermier/patients/patients.component';
import { NotificationsComponent } from './components/infermier/notifications/notifications.component';
import { ParametresComponent } from './components/infermier/parametres/parametres.component';
import { LayoutComponent } from './components/infermier/layout/layout.component';
import { ModifierPatientComponent } from './components/infermier/modifier-patient/modifier-patient.component';

export const routes: Routes = [
    {
        path: 'infirmier',
        component:LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardMdcnComponent },
            { path: 'patients', component: PatientsComponent }, 
            { path: 'notifications', component: NotificationsComponent }, 
            { path: 'parametres', component: ParametresComponent }, 
            { path: 'modifier-patient/:nss', component: ModifierPatientComponent }, 

        ],
        
    },
    { path: '', redirectTo: '/medecin/dashboardMdcn', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  