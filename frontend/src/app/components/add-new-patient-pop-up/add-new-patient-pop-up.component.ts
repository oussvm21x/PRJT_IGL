import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-patient-pop-up',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-new-patient-pop-up.component.html',
  styleUrl: './add-new-patient-pop-up.component.css'
})
export class AddNewPatientPopUpComponent {
  // array to store properties of the new patient 
  patientInfo = {
    nom: '',
    prenom: '',
    sexe: '',
    numeroSecu: '',
    mutuelle: '',
    dateNaissance: {
      day: '',
      month: '',
      year: ''
    },
    adresse: '',
    telephone: '',
    contactPerson: '',
    doctor: ''
  };
  // Sample options for selection boxes
  sexes = ['Homme', 'Femme'];
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // year options from 1900 to current year
  years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => (1900 + i).toString());

  // POP UPs
  currentPopup: string = 'popup1'; // Start with the first popup

  showPopup(popupId: string) {
    this.currentPopup = popupId; // Set the current popup to the one being shown
  }

  closePopup() {
    this.currentPopup = ''; // This will close the popup by setting the currentPopup to an empty string, effectively hiding all popups.
  }

  addPatient() {
    // Logic to add the patient is supposed to go here 
    console.log('Patient added:', this.patientInfo);
    this.closePopup(); // Close the popup after adding the patient
  }

}
