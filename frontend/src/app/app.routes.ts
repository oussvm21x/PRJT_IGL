import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardRadioComponent } from './components/radio/dashboard-radio/dashboard-radio.component';
import { RadiosComponent } from './components/radio/radios/radios.component';
import {NotificationsRadioComponent  } from './components/radio/notifications-radio/notifications-radio.component';
import {ParametresRadioComponent  } from './components/radio/parametres-radio/parametres-radio.component';
import {LayoutRadioComponent  } from './components/radio/layout-radio/layout-radio.component';

export const routes: Routes = [

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
    { path: '', redirectTo: '/radiologue/dashboardradio', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
