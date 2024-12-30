import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  Math = Math;

  patientForm = {
    nom: '',
    prenom: '',
    sexe: '',
    nss: '',
    mutuelle: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    contacts: [''], // Liste de contacts
  };

  patients: any[] = []; // Liste des patients chargée dynamiquement
  ajouterPatientVisible = false;
  currentPage: number = 1;
  itemsPerPage: number = 11;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients(); // Charger les patients au démarrage
  }

  // Charger les patients depuis le service
  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data; // Charger les données dans la liste des patients
      },
      (error) => {
        console.error('Erreur lors du chargement des patients:', error);
      }
    );
  }

  // Ajouter un patient
  ajouterPatient(): void {
    if (!this.patientForm.nom || !this.patientForm.prenom || !this.patientForm.sexe || !this.patientForm.nss || !this.patientForm.mutuelle || !this.patientForm.dateNaissance || !this.patientForm.adresse || !this.patientForm.telephone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const nouveauPatient = {
      ...this.patientForm,
      dateEntree: new Date().toISOString().split('T')[0], // Date actuelle
    };

    this.patientService.addPatient(nouveauPatient).subscribe(
      (patient) => {
        this.patients.push(patient); // Ajouter localement
        this.resetForm();
        this.toggleAjouterPatient();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du patient:', error);
      }
    );
  }

  // Modifier un patient
  modifierPatient(patient: any): void {
    console.log('Modifier patient :', patient);
    // Implémenter la modification via le service
  }

  // Supprimer un patient
  supprimerPatient(patient: any): void {
    this.patientService.deletePatient(patient.nss).subscribe(
      () => {
        this.patients = this.patients.filter((p) => p.nss !== patient.nss); // Retirer localement
      },
      (error) => {
        console.error('Erreur lors de la suppression du patient:', error);
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.patientForm = {
      nom: '',
      prenom: '',
      sexe: '',
      nss: '',
      mutuelle: '',
      dateNaissance: '',
      adresse: '',
      telephone: '',
      contacts: [''],
    };
  }

  // Gérer les contacts
  addContact(): void {
    this.patientForm.contacts.push(''); // Ajouter un champ de contact
  }

  removeContact(index: number): void {
    if (this.patientForm.contacts.length > 1) {
      this.patientForm.contacts.splice(index, 1); // Supprimer le contact
    }
  }

  toggleAjouterPatient(): void {
    this.ajouterPatientVisible = !this.ajouterPatientVisible;
  }

  // Pagination
  get paginatedPatients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.patients.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
