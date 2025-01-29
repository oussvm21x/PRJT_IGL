import { NgModule } from '@angular/core';
import { DashboardMdcnComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { NotificationsComponent } from './components/pharmacie/notifications/notifications.component';
import { ParametresComponent } from './components/pharmacie/parametres/parametres.component';
import { LayoutComponent } from './components/pharmacie/layout/layout.component';
import { RapportsComponent } from './components/rapports/rapports.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { OrdonnanacesComponent } from './components/ordonnanaces/ordonnanaces.component';
import { Routes,RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/infermier/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsComponent } from './components/infermier/patients/patients.component';
import { NotificationsComponent } from './components/infermier/notifications/notifications.component';
import { ParametresComponent } from './components/infermier/parametres/parametres.component';
import { LayoutComponent } from './components/infermier/layout/layout.component';
import { ModifierPatientComponent } from './components/infermier/modifier-patient/modifier-patient.component';
import { DashboardRadioComponent } from './components/radio/dashboard-radio/dashboard-radio.component';
import { RadiosComponent } from './components/radio/radios/radios.component';
import {NotificationsRadioComponent  } from './components/radio/notifications-radio/notifications-radio.component';
import {ParametresRadioComponent  } from './components/radio/parametres-radio/parametres-radio.component';
import {LayoutRadioComponent  } from './components/radio/layout-radio/layout-radio.component';
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
       {
        path: 'pahrmacien',
        component: LayoutComponent,
        children: [
            { path: 'dashboardMdcn', component: DashboardMdcnComponent },
            { path: 'ordonnances', component: OrdonnanacesComponent },
            { path: 'stocks', component: StocksComponent },
            { path: 'rapports', component: RapportsComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'parametres', component: ParametresComponent },

        ],

    },
     {
        path: 'radiologue',
        component:LayoutRadioComponent,
        children: [
            { path: 'dashboardradio', component: DashboardRadioComponent },
            { path: 'radios', component: RadiosComponent }, 
            { path: 'notifications', component: NotificationsRadioComponent }, 
            { path: 'parametres', component: ParametresRadioComponent }, 
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
export class AppRoutingModule { }


