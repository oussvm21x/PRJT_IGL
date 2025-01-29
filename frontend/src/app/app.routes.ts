import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardpharmaComponent } from './components/pharmacie/dashboard-mdcn/dashboard-mdcn.component';
import { NotificationspharmaComponent } from './components/pharmacie/notifications/notifications.component';
import { ParametrespharmaComponent } from './components/pharmacie/parametres/parametres.component';
import { LayoutpharmaComponent } from './components/pharmacie/layout/layout.component';
import { RapportsComponent } from './components/rapports/rapports.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { OrdonnanacesComponent } from './components/ordonnanaces/ordonnanaces.component';

export const routes: Routes = [
    {
        path: 'pahrmacien',
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
    { path: '', redirectTo: '/pahrmacien/dashboard', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

