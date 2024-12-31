import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-soin-pop-up',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-new-soin-pop-up.component.html',
  styleUrl: './add-new-soin-pop-up.component.css'
})
export class AddNewSoinPopUpComponent {
  // array to store properties of le nouveau soin 
  soinInfo = {
    titre: '',
    description: '',
    observations: ''
  };
  
  // POP UPs
  currentPopup: string = 'popup1'; // Start with the first popup

  showPopup(popupId: string) {
    this.currentPopup = popupId; // Set the current popup to the one being shown
  }

  closePopup() {
    this.currentPopup = ''; // This will close the popup by setting the currentPopup to an empty string, effectively hiding all popups.
  }

  addSoin() {
    // Logic to add le soin is supposed to go here 
    console.log('Soin added:', this.soinInfo);
    this.closePopup(); // Close the popup after adding le soin 
  }


}
