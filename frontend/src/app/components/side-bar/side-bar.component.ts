import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'] 

})
export class SideBarComponent {
  public collapsed=true;
  public sideBarElements = [
    { routeLink: '/dashboard', icon: 'assets/dashboard_icon.png', label: 'Dashboard' },
    { routeLink: '/patients', icon: 'assets/patients_icon.png', label: 'Patients' },
    { routeLink: '/settings', icon: 'assets/settings_icon.png', label: 'Settings' }
  ];
}
