import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AntecedentsComponent } from './components/antecedents/antecedents.component';
import { PagesComponent } from './components/pages/pages.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

 


export const routes: Routes = [
  
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'historique', component: HistoriqueComponent },
      { path: 'antecedents', component: AntecedentsComponent },
      { path: 'landingPage', component: LandingPageComponent},
      { path: '**', redirectTo: 'dashboard' },

];