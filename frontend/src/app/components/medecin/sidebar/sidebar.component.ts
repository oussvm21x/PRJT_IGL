import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() activeButton: string = 'dashboard'; // Le bouton actif par défaut

  onClick(button: string) {
    this.activeButton = button;

}
}
