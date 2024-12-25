import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsComponent } from './components/medecin/patients/patients.component';
import { NotificationsComponent } from './components/medecin/notifications/notifications.component';
import { ParametresComponent } from './components/medecin/parametres/parametres.component';
import { LayoutComponent } from './components/medecin/layout/layout.component';

export const routes: Routes = [
    {
        path: 'medecin',
        component:LayoutComponent,
        children: [
            { path: 'dashboardMdcn', component: DashboardMdcnComponent },
            { path: 'patients', component: PatientsComponent }, 
            { path: 'notifications', component: NotificationsComponent }, 
            { path: 'parametres', component: ParametresComponent }, 
        ],
        
    },
    { path: '', redirectTo: '/medecin/dashboardMdcn', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  