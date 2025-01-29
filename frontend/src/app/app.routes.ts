import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardpatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { NotificationspatientComponent } from './components/patient/notifications-patient/notifications-patient.component';
import { ParametrespatientComponent } from './components/patient/parametres-patient/parametres-patient.component';
import { LayoutpatientComponent } from './components/patient/layout-patient/layout-patient.component';
import { DossierComponent } from './components/patient/dossier/dossier.component';

export const routes: Routes = [
    {
        path: 'patient',
        component:LayoutpatientComponent,
        children: [
            { path: 'dashboard', component: DashboardpatientComponent },
            { path: 'notifications', component: NotificationspatientComponent }, 
            { path: 'parametres', component: ParametrespatientComponent }, 
            { path: 'dossier', component: DossierComponent }, 

        ],
        
    },
    { path: '', redirectTo: '/patient/dashboard', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  