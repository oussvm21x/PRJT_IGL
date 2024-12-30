import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientFolderProfileComponent } from '../patient-folder-profile/patient-folder-profile.component';
import { PatientFolderConsultationsComponent } from '../patient-folder-consultations/patient-folder-consultations.component';
import { PatientFolderSoinsComponent } from '../patient-folder-soins/patient-folder-soins.component';
import { PatientFolderAntecedentsComponent } from '../patient-folder-antecedents/patient-folder-antecedents.component';



@Component({
  selector: 'app-patient-folder',
  imports: [CommonModule, RouterModule,PatientFolderProfileComponent,PatientFolderConsultationsComponent,PatientFolderAntecedentsComponent,PatientFolderSoinsComponent],
  templateUrl: './patient-folder.component.html',
  styleUrl: './patient-folder.component.css',
  
})
export class PatientFolderComponent {

  
  public buttons=['Profil' ,'Consultations' ,'Antécédents' ,'Soins'];
  public selectedComponent: string = this.buttons[0]; // Default component
  public selectedButton: string = this.buttons[0]; // Track the selected button

  // Method to change the selected component and button
  changeComponent(component: string) {
    this.selectedComponent = component; // Update the selected component
    this.selectedButton = component; // Update the selected button
  }
}
