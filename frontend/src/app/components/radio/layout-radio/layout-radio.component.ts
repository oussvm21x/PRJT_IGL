import { Component,OnInit } from '@angular/core';
import { SidebarRadioComponent } from '../sidebar-radio/sidebar-radio.component';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-layout-radio',
  imports: [
        SidebarRadioComponent,
        RouterOutlet
      
    ],
  templateUrl: './layout-radio.component.html',
  styleUrl: './layout-radio.component.css'
})

export class LayoutRadioComponent implements OnInit{
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }
}
