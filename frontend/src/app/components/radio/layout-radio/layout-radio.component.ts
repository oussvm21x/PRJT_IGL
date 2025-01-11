import { Component,OnInit } from '@angular/core';
import { SidebarLabComponent } from '../sidebar-lab/sidebar-lab.component';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-layout-lab',
  imports: [
        SidebarLabComponent,
        RouterOutlet
      
    ],
  templateUrl: './layout-lab.component.html',
  styleUrl: './layout-lab.component.css'
})

export class LayoutLabComponent implements OnInit{
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }
}
