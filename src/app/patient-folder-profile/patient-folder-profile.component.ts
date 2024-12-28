import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-patient-folder-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './patient-folder-profile.component.html',
  styleUrl: './patient-folder-profile.component.css',
  
})
export class PatientFolderProfileComponent {
  public patientInfos=['Nom:' ,'Prénom:' ,'Date de Naissance:' ,'Médecin Traitant:' ,'Adresse:' ,'Mutuelle:' ,'N°Téléphone:' ,'Personnes à contacter'];

}
