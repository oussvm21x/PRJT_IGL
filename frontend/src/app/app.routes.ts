import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { PatientsComponent } from './components/infirmier/patients/patients.component';
import { NotificationsComponent } from './components/infirmier/notifications/notifications.component';
import { ParametresComponent } from './components/infirmier/parametres/parametres.component';
import { LayoutComponent } from './components/infirmier/layout/layout.component';
import { DashboardInfirmierComponent } from './components/infirmier/dashboard-infirmier/dashboard-infirmier.component';

export const routes: Routes = [
    {
        path: 'medecin',
        component:LayoutComponent,
        children: [
            { path: 'dashboardInfirmier', component: DashboardInfirmierComponent },
            { path: 'patients', component: PatientsComponent }, 
            { path: 'notifications', component: NotificationsComponent }, 
            { path: 'parametres', component: ParametresComponent }, 
        ],
        
    },
    { path: '', redirectTo: '/medecin/dashboardInfirmier', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  