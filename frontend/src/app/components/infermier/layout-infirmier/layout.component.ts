import { Component,OnInit } from '@angular/core';
import { SidebarinfComponent } from '../sidebar-infirmier/sidebar.component';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
      SidebarinfComponent,
      RouterOutlet
    
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutinfComponent implements OnInit {
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }
}
