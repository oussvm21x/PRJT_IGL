import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsComponent } from './components/medecin/patients/patients.component';
import { NotificationsComponent } from './components/medecin/notifications/notifications.component';
import { ParametresComponent } from './components/medecin/parametres/parametres.component';
import { LayoutComponent } from './components/medecin/layout/layout.component';
import { ModifierPatientComponent } from './components/medecin/modifier-patient/modifier-patient.component';

import { DashboardLabComponent } from './components/laborantin/dashboard-lab/dashboard-lab.component';
import { BilansComponent } from './components/laborantin/bilans/bilans.component';
import {NotificationsLabComponent  } from './components/laborantin/notifications-lab/notifications-lab.component';
import {ParametresLabComponent  } from './components/laborantin/parametres-lab/parametres-lab.component';
import {LayoutLabComponent  } from './components/laborantin/layout-lab/layout-lab.component';

export const routes: Routes = [
    {
        path: 'medecin',
        component:LayoutComponent,
        children: [
            { path: 'dashboardMdcn', component: DashboardMdcnComponent },
            { path: 'patients', component: PatientsComponent }, 
            { path: 'notifications', component: NotificationsComponent }, 
            { path: 'parametres', component: ParametresComponent }, 
            { path: 'modifier-patient/:nss', component: ModifierPatientComponent }, 

        ],

        
        
    },
    {
        path: 'laborantin',
        component:LayoutLabComponent,
        children: [
            { path: 'dashboardLab', component: DashboardLabComponent },
            { path: 'bilans', component: BilansComponent }, 
            { path: 'notifications', component: NotificationsLabComponent }, 
            { path: 'parametres', component: ParametresLabComponent }, 
        ],

        
        
    },
    { path: '', redirectTo: '/laborantin/dashboardLab', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  