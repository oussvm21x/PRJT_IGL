import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.css']
})
export class SidebarpatientComponent implements OnInit {
  @Input() activeRoute: string = ''; // Route active
  activeButton: string = ''; // Bouton actif

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Définir la route active lors de l'initialisation
    this.activeRoute = this.router.url;
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }
  
}
