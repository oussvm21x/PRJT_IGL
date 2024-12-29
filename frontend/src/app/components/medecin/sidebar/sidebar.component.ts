import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive,Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  @Input() activeRoute: string = 'dashboard';
   activeButton: string = 'dashboard'; 

  setActiveButton(button: string): void {
    this.activeButton = button;}
}
