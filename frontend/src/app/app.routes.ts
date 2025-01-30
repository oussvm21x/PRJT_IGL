import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { DashboardpharmaComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { NotificationspharmaComponent } from './components/pharmacie/notifications/notifications.component';
import { ParametrespharmaComponent } from './components/pharmacie/parametres/parametres.component';
import { LayoutpharmaComponent } from './components/pharmacie/layout/layout.component';
import { RapportsComponent } from './components/rapports/rapports.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { OrdonnanacesComponent } from './components/ordonnanaces/ordonnanaces.component';


import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { PatientsComponent } from './components/medecin/patients/patients.component';
import { NotificationsComponent } from './components/medecin/notifications/notifications.component';
import { ParametresComponent } from './components/medecin/parametres/parametres.component';
import { LayoutComponent } from './components/medecin/layout/layout.component';
import { ModifierPatientComponent } from './components/medecin/modifier-patient/modifier-patient.component';

import { DashboardRadioComponent } from './components/radio/dashboard-radio/dashboard-radio.component';
import { RadiosComponent } from './components/radio/radios/radios.component';
import {NotificationsRadioComponent  } from './components/radio/notifications-radio/notifications-radio.component';
import {ParametresRadioComponent  } from './components/radio/parametres-radio/parametres-radio.component';
import {LayoutRadioComponent  } from './components/radio/layout-radio/layout-radio.component';

import { DashboardLabComponent } from './components/laborantin/dashboard-lab/dashboard-lab.component';
import { BilansComponent } from './components/laborantin/bilans/bilans.component';
import {NotificationsLabComponent  } from './components/laborantin/notifications-lab/notifications-lab.component';
import {ParametresLabComponent  } from './components/laborantin/parametres-lab/parametres-lab.component';
import {LayoutLabComponent  } from './components/laborantin/layout-lab/layout-lab.component';

import { DashboardpatientComponent } from './components/patient/dashboard-patient/dashboard-patient.component';
import { NotificationspatientComponent } from './components/patient/notifications-patient/notifications-patient.component';
import { ParametrespatientComponent } from './components/patient/parametres-patient/parametres-patient.component';
import { LayoutpatientComponent } from './components/patient/layout-patient/layout-patient.component';
import { DossierComponent } from './components/patient/dossier/dossier.component';

import { DashboardinfComponent } from './components/infermier/dashboard-infirmier/dashboard-mdcn.component';
import { PatientsinfComponent } from './components/infermier/patients-infirmier/patients.component';
import { NotificationsinfComponent } from './components/infermier/notifications-infirmier/notifications.component';
import { ParametresinfComponent } from './components/infermier/parametres-infirmier/parametres.component';
import { LayoutinfComponent } from './components/infermier/layout-infirmier/layout.component';
import { ModifierPatientinfComponent } from './components/infermier/modifier-patient-infirmier/modifier-patient.component';

import { LandingPageComponent } from './components/landing-page/landing-page.component';

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
        path: 'landing',
        component:LandingPageComponent,
    
    },
    {
        path: 'pharmacien',
        component: LayoutpharmaComponent,
        children: [
            { path: 'dashboard', component: DashboardpharmaComponent },
            { path: 'ordonnances', component: OrdonnanacesComponent },
            { path: 'stocks', component: StocksComponent },
            { path: 'rapports', component: RapportsComponent },
            { path: 'notifications', component: NotificationspharmaComponent },
            { path: 'parametres', component: ParametrespharmaComponent },

        ],

    },
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
    { path: '', component: LandingPageComponent, pathMatch: 'full' }, // Page par défaut
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}

  