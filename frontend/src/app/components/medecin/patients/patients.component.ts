import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  ordonnanceForm = {
    numeroOrdonnance: '', // Numéro d'ordonnance
    nss: '',             // Numéro de Sécurité Sociale
    nomEtPrenom: '',     // Nom et prénom
    nomMedecin: '',      // Nom du médecin
    datePrescription: new Date(),  // Date de prescription
    etat: '',            // État
    medicaments: [       // Liste des médicaments
      {
        nom: '',
        dosage: '',
        forme: '',
        quantite: '',
        posologie: '',
      },
    ],

  };




  patients: any[] = []; // Liste des patients chargée dynamiquement
  ajouterPatientVisible = false;
  currentPage: number = 1;
  itemsPerPage: number = 11;

  patientToDelete: any = null; // Patient en cours de suppression

  constructor(private patientService: PatientService, private router: Router) { }

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
  modifierPatient(nss: string): void {
    this.router.navigate(['/medecin/modifier-patient', nss]); // Navigation vers la page de modification
  }

  // Demander une confirmation avant suppression
  requestDeletion(patient: any): void {
    this.patientToDelete = patient;
  }

  // Annuler la suppression
  cancelDeletion(): void {
    this.patientToDelete = null;
  }

  // Confirmer la suppression
  confirmDeletion(): void {
    if (this.patientToDelete) {
      this.patientService.deletePatient(this.patientToDelete.id).subscribe(
        () => {
          this.patients = this.patients.filter((p) => p.id !== this.patientToDelete.id);
          console.log('Patient supprimé avec succès.');
          this.patientToDelete = null;
        },
        (error) => {
          console.error('Erreur lors de la suppression du patient :', error);
          this.patientToDelete = null;
        }
      );
    }
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

  // Gérer les contacts (li keynin f form)
  addContact(): void {
    this.patientForm.contacts.push('');
  }

  removeContact(index: number): void {
    if (this.patientForm.contacts.length > 1) {
      this.patientForm.contacts.splice(index, 1);
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

  ajouterOrdonnanceVisible = false;

  toggleAjouterOrdonnance() {
    this.ajouterOrdonnanceVisible = !this.ajouterOrdonnanceVisible;
  }

  addMedicament() {
    this.ordonnanceForm.medicaments.push({
      nom: '',
      dosage: '',
      forme: '',
      quantite: '',
      posologie: '',
    });
  }

  removeMedicament(index: number) {
    this.ordonnanceForm.medicaments.splice(index, 1);
  }

  ajouterOrdonnance() {
    console.log('Ordonnance ajoutée :', this.ordonnanceForm);
    this.toggleAjouterOrdonnance(); // Ferme le pop-up
  }


}


