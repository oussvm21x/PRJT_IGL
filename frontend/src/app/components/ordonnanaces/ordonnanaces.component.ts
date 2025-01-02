import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdonnancesService } from '../../services/ordonnances.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordonnanaces',
  templateUrl: './ordonnanaces.component.html',
  styleUrls: ['./ordonnanaces.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})

export class OrdonnanacesComponent implements OnInit {
  ajouterOrdonnanceVisible = false;
  ordonnanceForm = {
    numeroOrdonnance: '',
    nss: '',
    nomEtPrenom: '',
    nomMedecin: '',
    datePrescription: '',
    etat: '',
    medicaments: [{ nom: '', dosage: '', forme: '', quantite: '', posologie: '' }]
  };

  ordonnances: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  // Property to track the ordonnance to delete
  ordonnanceToDelete: any = null;

  constructor(private ordonnancesService: OrdonnancesService) { }

  ngOnInit() {
    this.loadAllOrdonnances(); // Load all ordonnances without patient filter
  }

  loadAllOrdonnances() {
    this.ordonnancesService.getAllOrdonnances().subscribe(
      (data) => {
        this.ordonnances = data;
      },
      (error) => {
        console.error('Error loading ordonnances', error);
      }
    );
  }

  // Pagination logic
  get totalPages(): number {
    return Math.ceil(this.ordonnances.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedOrdonnances(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.ordonnances.slice(startIndex, endIndex);
  }

  toggleAjouterOrdonnance() {
    this.ajouterOrdonnanceVisible = !this.ajouterOrdonnanceVisible;
  }

  addMedicament() {
    this.ordonnanceForm.medicaments.push({ nom: '', dosage: '', forme: '', quantite: '', posologie: '' });
  }

  removeMedicament(index: number) {
    this.ordonnanceForm.medicaments.splice(index, 1);
  }

  submitOrdonnance() {
    if (this.validateOrdonnanceForm()) {
      this.ordonnancesService.addOrdonnance(this.ordonnanceForm).subscribe(
        (newOrdonnance: any) => {
          // Add the new ordonnance to the list after creation
          this.ordonnances.push(newOrdonnance);  // Add new ordonnance to the list
          this.toggleAjouterOrdonnance();  // Close the form
        },
        (error: any) => {
          console.error('Error saving ordonnance', error);
        }
      );
    }
  }


  validateOrdonnanceForm() {
    const form = this.ordonnanceForm;
    return form.numeroOrdonnance && form.nss && form.nomEtPrenom && form.nomMedecin && form.datePrescription && form.etat;
  }

  modifierOrdonnance(numero: string) {
    console.log('Looking for ordonnance with numero:', numero);  // Log the numero being passed
    console.log('Current ordonnances:', this.ordonnances);  // Log the ordonnances array to see its structure

    const ordonnance = this.ordonnances.find(o => {
      console.log('Checking ordonnance with id:', o.id);  // Log each ordonnance id being checked
      return o.id === numero;  // Compare with the correct property
    });

    if (ordonnance) {
      console.log('Found ordonnance:', ordonnance);  // Log the ordonnance found
      this.ordonnanceForm = { ...ordonnance };  // Populate the form with ordonnance data
      this.toggleAjouterOrdonnance();  // Open the form for editing
    } else {
      console.error('Ordonnance non trouvée');  // Log if ordonnance is not found
    }
  }




  // Request for deletion
  requestOrdonnanceDeletion(ordonnance: any) {
    this.ordonnanceToDelete = ordonnance; // Store the ordonnance to delete
  }

  // Cancel deletion
  cancelDeletion() {
    this.ordonnanceToDelete = null; // Reset ordonnanceToDelete
  }

  // Confirm deletion
  confirmDeletion() {
    if (this.ordonnanceToDelete) {
      // Ensure you're using the correct identifier for deletion (numeroOrdonnance)
      this.ordonnancesService.deleteOrdonnance(this.ordonnanceToDelete.numeroOrdonnance).subscribe(
        () => {
          // Remove the ordonnance from the list after successful deletion
          const index = this.ordonnances.findIndex(o => o.numeroOrdonnance === this.ordonnanceToDelete.numeroOrdonnance);
          if (index !== -1) {
            this.ordonnances.splice(index, 1);
          }
          this.cancelDeletion();  // Close the dialog
        },
        (error: any) => {
          console.error('Error deleting ordonnance', error);
        }
      );
    }
  }


  updateOrdonnance() {
    if (this.validateOrdonnanceForm()) {
      this.ordonnancesService.updateOrdonnance(this.ordonnanceForm).subscribe(
        (updatedOrdonnance: any) => {
          // Find the existing ordonnance and update it with the new data
          const index = this.ordonnances.findIndex(o => o.numeroOrdonnance === updatedOrdonnance.numeroOrdonnance);
          if (index !== -1) {
            this.ordonnances[index] = updatedOrdonnance;  // Replace the existing ordonnance
          }
          this.toggleAjouterOrdonnance();  // Close the form
        },
        (error: any) => {
          console.error('Error updating ordonnance', error);
        }
      );
    }
  }

}
