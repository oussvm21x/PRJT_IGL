import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMdcnComponent } from './components/medecin/dashboard-mdcn/dashboard-mdcn.component';
import { NotificationsComponent } from './components/medecin/notifications/notifications.component';
import { ParametresComponent } from './components/medecin/parametres/parametres.component';
import { LayoutComponent } from './components/medecin/layout/layout.component';
import { RapportsComponent } from './components/rapports/rapports.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { OrdonnanacesComponent } from './components/ordonnanaces/ordonnanaces.component';

export const routes: Routes = [
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
    { path: '', redirectTo: '/pahrmacien/dashboardMdcn', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

