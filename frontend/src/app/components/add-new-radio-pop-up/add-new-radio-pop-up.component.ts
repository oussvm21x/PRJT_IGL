import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-radio-pop-up',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-new-radio-pop-up.component.html',
  styleUrl: './add-new-radio-pop-up.component.css'
})
export class AddNewRadioPopUpComponent {
  // array to store properties of la nouvelle radio 
  radioInfo = {
    nom: 'Nom de la radio', // il faut stocker ici le nom de la radio demandée par le médecin 
    image: '',
    compteRendu: ''
  };
  
  // Méthode pour gérer la sélection de fichier
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        // Convertit le fichier en URL ou en Base64
        reader.onload = () => {
            this.radioInfo.image = reader.result as string; // Stocke l'image dans radioInfo.image
        };

        reader.readAsDataURL(file); // Lit le fichier comme une URL de données
    }
  }

  // Méthode pour supprimer l'image
  deleteImage() {
    this.radioInfo.image = ''; // Réinitialise l'image
  }
   // POP UPs
   currentPopup: string = 'popup1'; // Start with the first popup

   showPopup(popupId: string) {
     this.currentPopup = popupId; // Set the current popup to the one being shown
   }
 
   closePopup() {
     this.currentPopup = ''; // This will close the popup by setting the currentPopup to an empty string, effectively hiding all popups.
   }
   
   addRadio() {
    // Logic to add la radio is supposed to go here 
    console.log('Radio added:', this.radioInfo);
    this.closePopup(); // Close the popup after adding la radio
  }

}
