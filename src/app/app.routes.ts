import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { AntecedentsComponent } from './antecedents/antecedents.component';
import { PagesComponent } from './pages/pages.component';
import { HistoriqueComponent } from './historique/historique.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';

 
/*export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'antecedents', component: AntecedentsComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: '**', redirectTo: 'dashboard' },

];*/

export const routes: Routes = [
  
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'historique', component: HistoriqueComponent },
      { path: 'antecedents', component: AntecedentsComponent },
      { path: '**', redirectTo: 'dashboard' },

];

