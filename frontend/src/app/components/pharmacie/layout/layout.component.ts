import { Component,OnInit } from '@angular/core';
import { SidebarpharmaComponent } from '../sidebar/sidebar.component';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
      SidebarpharmaComponent,
      RouterOutlet
    
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutpharmaComponent implements OnInit {
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }
}
