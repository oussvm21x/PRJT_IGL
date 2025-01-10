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
  isLoading: boolean = false;
  patientForm = {
    nom: '',
    prenom: '',
    sexe: '',
    num_securite_sociale: '',
    date_naissance: '',
    adresse: '',
    telephone: '',
    email: 'default.email@example.com', // Ajout de l'email
    personne_contact: [''], // Liste de contacts
    medecin_nom: '', // Champ pour le nom du médecin traitant
    medecin_prenom: '', // Champ pour le prénom du médecin traitant
  };
  
  

  patients: any[] = []; // Liste des patients chargée dynamiquement
  ajouterPatientVisible = false;
  currentPage: number = 1;
  itemsPerPage: number = 11;

  patientToDelete: any = null; // Patient en cours de suppression

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients(); // Charger les patients au démarrage
  }

  // Charger les patients depuis le service
  loadPatients(): void {
    this.isLoading = true; // Début du chargement
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data; // Charger les patients dans la liste
        console.log('Patients chargés:', this.patients);
        this.isLoading = false; // Début du chargement

      },
      (error) => {
        console.error('Erreur lors du chargement des patients:', error);
      }
    );
  }
  loadPatientDetails(num_securite_sociale: string): void {
    this.patientService.getPatient(num_securite_sociale).subscribe(
      (data) => {
        console.log('Détails du patient:', data);
        // Vous pouvez stocker ces détails dans une variable si besoin
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du patient:', error);
      }
    );
  }
  

  // Ajouter un patient
  ajouterPatient(): void {
    if (
      !this.patientForm.nom ||
      !this.patientForm.prenom ||
      !this.patientForm.num_securite_sociale ||
      !this.patientForm.date_naissance ||
      !this.patientForm.adresse ||
      !this.patientForm.telephone ||
      !this.patientForm.email
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const nouveauDossier = {
      patient: {
        num_securite_sociale: this.patientForm.num_securite_sociale,
        nom: this.patientForm.nom,
        prenom: this.patientForm.prenom,
        date_naissance: this.patientForm.date_naissance,
        adresse: this.patientForm.adresse,
        telephone: this.patientForm.telephone,
        email: this.patientForm.email,
        sexe: this.patientForm.sexe,

        medecins_traitants: [
          {
            nom: this.patientForm.medecin_nom,
            prenom: this.patientForm.medecin_prenom,
          },
        ],
        personne_contact: this.patientForm.personne_contact.join(', '),
        user: {
          username: 'static_user',
          password: 'static_password',
          role: 'patient',
        },
      },
      id_dossier: '19',
      date_ouverture: new Date().toISOString().split('T')[0],
      antecedents: ['Hypertension', 'Diabetes'],
    };
  
    console.log('Données envoyées au backend:', nouveauDossier);
  
    this.patientService.addDpiOrPatient(nouveauDossier).subscribe(
      (response) => {
        console.log('Patient ajouté avec succès:', response);
        this.toggleAjouterPatient();
        this.loadPatients();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du patient:', error);
      }
    );
  }
  
  
  
  
  

  // Modifier un patient
  modifierPatient(num_securite_sociale: string): void {
    this.router.navigate(['/medecin/modifier-patient', num_securite_sociale]); // Navigation vers la page de modification
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
      num_securite_sociale: '',
      date_naissance: '',
      adresse: '',
      telephone: '',
      email: 'default.email@example.com', // Ajout de l'email ici
      personne_contact: [''],
      medecin_nom: '', 
      medecin_prenom: '', 
    };
  }
  

  // Gérer les contacts (li keynin f form)
  addContact(): void {
    this.patientForm.personne_contact.push('');
  }
  

  removeContact(index: number): void {
    if (this.patientForm.personne_contact.length > 1) {
      this.patientForm.personne_contact.splice(index, 1); 
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
