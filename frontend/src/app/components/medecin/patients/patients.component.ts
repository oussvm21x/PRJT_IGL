import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-patients',
  imports: [CommonModule,FormsModule], 
  standalone: true,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patientForm = {
    nom: '',
    prenom: '',
    sexe: '',
    nss: '',
    mutuelle: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    contacts: [''] // Liste de contacts
  };

  ajouterPatient(): void {
    // Vérification des champs obligatoires
    if (!this.patientForm.nom || !this.patientForm.prenom || !this.patientForm.sexe || !this.patientForm.nss || !this.patientForm.mutuelle || !this.patientForm.dateNaissance || !this.patientForm.adresse || !this.patientForm.telephone  ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    // Ajouter le patient à la liste des patients
    const nouveauPatient = {
      nom: this.patientForm.nom,
      prenom: this.patientForm.prenom,
      sexe: this.patientForm.sexe,
      nss: this.patientForm.nss,
      mutuelle: this.patientForm.mutuelle,
      dateNaissance: this.patientForm.dateNaissance,
      adresse: this.patientForm.adresse,
      telephone: this.patientForm.telephone,
      contacts: [...this.patientForm.contacts], // Cloner les contacts
      dateEntree: new Date().toISOString().split('T')[0] // Date actuelle
    };
  
    this.patients.push(nouveauPatient);
  
    // Réinitialiser le formulaire
    this.patientForm = {
      nom: '',
      prenom: '',
      sexe: '',
      nss: '',
      mutuelle: '',
      dateNaissance: '',
      adresse: '',
      telephone: '',
      contacts: ['']
    };
  
    // Fermer la modale
    this.toggleAjouterPatient();
  }
  
  
  contacts: string[] = [''];

  addContact(): void {
    this.contacts.push(''); // Ajoute un champ vide pour un nouveau contact
  }

  removeContact(index: number): void {
    if (this.contacts.length > 1) {
      this.contacts.splice(index, 1); // Supprime le contact à l'indice donné
    }
  }


  ajouterPatientVisible = false;

  toggleAjouterPatient() {
    this.ajouterPatientVisible = !this.ajouterPatientVisible;
  }
  patients = [
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },
    {
      nss: '123456789',
      nom: 'John',
      prenom: 'Doe',
      telephone: '+213 123 456 789',
      dateEntree: '2024-01-01'
    },

    {
      nss: '987654321',
      nom: 'Jane',
      prenom: 'Smith',
      telephone: '+213 987 654 321',
      dateEntree: '2023-12-15'
    }
  ];
  Math = Math; // Expose `Math` au template

  currentPage: number = 1;
  itemsPerPage: number = 11;
  constructor() {}

  ngOnInit(): void {
    console.log(this.patients); // Vérifiez si les données des patients apparaissent dans la console
  }
  modifierPatient(patient: any) {
    console.log('Modifier patient :', patient);
  }

  supprimerPatient(patient: any) {
    console.log('Supprimer patient :', patient);
  }

  // Méthode pour obtenir les patients de la page courante
  get paginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.patients.slice(startIndex, endIndex);
  }

  // Changer de page
  changePage(page: number) {
    this.currentPage = page;
  }
}
