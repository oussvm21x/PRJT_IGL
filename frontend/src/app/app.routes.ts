import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardinfComponent } from './components/infermier/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsinfComponent } from './components/infermier/patients/patients.component';
import { NotificationsinfComponent } from './components/infermier/notifications/notifications.component';
import { ParametresinfComponent } from './components/infermier/parametres/parametres.component';
import { LayoutinfComponent } from './components/infermier/layout/layout.component';
import { ModifierPatientinfComponent } from './components/infermier/modifier-patient/modifier-patient.component';

export const routes: Routes = [
    {
        path: 'infirmier',
        component:LayoutinfComponent,
        children: [
            { path: 'dashboard', component: DashboardinfComponent },
            { path: 'patients', component: PatientsinfComponent }, 
            { path: 'notifications', component: NotificationsinfComponent }, 
            { path: 'parametres', component: ParametresinfComponent }, 
            { path: 'modifier-patient/:nss', component: ModifierPatientinfComponent }, 

        ],
        
    },
    { path: '', redirectTo: '/infirmier/dashboard', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  