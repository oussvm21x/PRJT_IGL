import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar-patient/sidebar-patient.component';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
      SidebarComponent,
      RouterOutlet

  ],
  templateUrl: './layout-patient.component.html',
  styleUrl: './layout-patient.component.css'
})
export class LayoutpatientComponent implements OnInit {
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    }
  );
  }
}
