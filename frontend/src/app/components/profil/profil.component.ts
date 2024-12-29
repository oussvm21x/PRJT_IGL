import { Component } from '@angular/core';
import { PatientFolderProfileComponent } from "../patient-folder-profile/patient-folder-profile.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [PatientFolderProfileComponent, NavbarComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent {}
