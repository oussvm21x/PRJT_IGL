import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConsultationService } from '../../../services/consultation.service';
import { AntecedentService } from '../../../services/antecedent.service';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-modifier-patient',
  templateUrl: './modifier-patient.component.html',
  styleUrls: ['./modifier-patient.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ModifierPatientComponent implements OnInit {
  public consultationElements = ['Ordonnance', 'Bilans', 'Résumé'];
  showConsultationForm: boolean = false;
  showAntecedentModal: boolean = false;
  patient: any;
  consultations: any[] = [];
  antecedents: any[] = []; 
  patientForm!: FormGroup;
  consultationForm!: FormGroup;
  antecedentForm!: FormGroup; 
  nss!: string;
  activeTab: string = 'profil';
  showModal: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private antecedentService: AntecedentService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nss = this.route.snapshot.paramMap.get('nss')!;
    this.initForms();
    this.loadPatient();
    this.loadConsultations();
    this.loadAntecedents(); // Charger les antécédents
  }

  initForms(): void {
    this.patientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      nss: [{ value: '', disabled: true }, Validators.required],
      mutuelle: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
    });
    this.antecedentForm = this.fb.group({
      condition: ['', Validators.required],
      date: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
    
  }

  initConsultationForm(): void {
    this.consultationForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      resume: ['', Validators.required],
      bilans: this.fb.group({
        radio: [''], // Pas requis initialement
        biologique: [''], // Pas requis initialement
      }),
      ordonnance: this.fb.array([]), // Médicaments sous forme de tableau
    });
  }
  initAntecedentForm(): void {
    this.antecedentForm = this.fb.group({
      condition: ['', Validators.required],
      date: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
  }
  get ordonnance(): FormArray {
    return this.consultationForm.get('ordonnance') as FormArray;
  }

  addMedication(): void {
    this.ordonnance.push(
      this.fb.group({
        nom: ['', Validators.required],
        dose: ['', Validators.required],
        duree: ['', Validators.required],
        details: ['', Validators.required],
      })
    );
  }

  removeMedication(index: number): void {
    this.ordonnance.removeAt(index);
  }

  loadPatient(): void {
    this.patientService.getPatient(this.nss).subscribe(
      (data) => {
        this.patient = data;
        this.patientForm.patchValue(data);
      },
      (error) => {
        console.error('Erreur lors du chargement du patient:', error);
      }
    );
  }

  loadConsultations(): void {
    this.consultationService.getConsultationsByPatientNSS(this.nss).subscribe(
      (data) => {
        this.consultations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des consultations:', error);
      }
    );
  }
  loadAntecedents(): void {
    this.antecedentService.getAntecedentsByPatientNSS(this.nss).subscribe(
      (data) => (this.antecedents = data),
      (error) => console.error('Erreur lors du chargement des antécédents:', error)
    );
  }

  addAntecedent(): void {
    if (this.antecedentForm.valid) {
      const newAntecedent = {
        ...this.antecedentForm.value,
        patientNSS: this.nss,
      };

      this.antecedentService.addAntecedent(newAntecedent).subscribe(
        (data) => {
          this.antecedents.push(data);
          this.toggleAntecedentModal(); // Fermer la popup après ajout
          alert('Antécédent ajouté avec succès !');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'antécédent:', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }


  submitConsultation(): void {
    if (this.consultationForm.valid) {
      const newConsultation = {
        ...this.consultationForm.value,
        patientNSS: this.nss,
      };
  
      this.consultationService.addConsultation(newConsultation).subscribe(
        (data) => {
          this.consultations.push(data);
          this.toggleModal(); // Fermer le modal
          alert('Consultation ajoutée avec succès !');
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la consultation:', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

  deleteAntecedent(id: number): void {
    this.antecedentService.deleteAntecedent(id).subscribe(
      () => {
        this.antecedents = this.antecedents.filter((a) => a.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'antécédent:', error);
      }
    );
  }



  //confirmation suppression 
      antecedentToDelete: any = null; 
      askToDeleteAntecedent(antecedent: any): void {
        this.antecedentToDelete = antecedent;
      }

      cancelAntecedentDeletion(): void {
        this.antecedentToDelete = null;
      }

      confirmAntecedentDeletion(): void {
        if (this.antecedentToDelete) {
          this.antecedentService.deleteAntecedent(this.antecedentToDelete.id).subscribe(
            () => {
              this.antecedents = this.antecedents.filter(
                (a) => a.id !== this.antecedentToDelete.id
              );
              this.antecedentToDelete = null;
            },
            (error) => {
              console.error('Erreur lors de la suppression de l\'antécédent:', error);
              alert('Une erreur est survenue lors de la suppression.');
              this.antecedentToDelete = null;
            }
          );
        }
      }
        

  goToPatientsPage(): void {
    this.router.navigate(['/medecin/patients']);
  }

  saveChanges(): void {
    if (this.patientForm.valid) {
      const updatedPatient = { ...this.patientForm.value, nss: this.nss };
      this.patientService.updatePatient(updatedPatient).subscribe(
        () => {
          alert('Patient mis à jour avec succès');
          this.router.navigate(['/medecin/patients']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du patient:', error);
        }
      );
    }
  }


  

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.consultationForm.reset();
      this.initConsultationForm();
    }
  }

  // afficher ou masquer popup antecedents
  toggleAntecedentModal(): void {
    console.log(this.antecedentForm); // Vérifiez si le formulaire est défini
    this.showAntecedentModal = !this.showAntecedentModal;
    if (!this.showAntecedentModal) {
      this.antecedentForm.reset(); // Cette ligne ne devrait pas poser problème si `antecedentForm` est bien initialisé
    }
  }
  
  

  addConsultation(): void {
    this.showConsultationForm = !this.showConsultationForm;
  }

  downloadPDF(content: string, title: string): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(content, 10, 20);
    doc.save(`${title}.pdf`);
  }

  generateOrdonnanceContent(ordonnance: any[]): string {
    return ordonnance
      .map(o => `${o.nom} : ${o.dose}, ${o.duree}, ${o.details}`)
      .join('\n');
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }


  // pagination
  currentAntecedentPage: number = 1;
  itemsPerAntecedentPage: number = 6; 
  Math = Math;


  get paginatedAntecedents() {
    const startIndex = (this.currentAntecedentPage - 1) * this.itemsPerAntecedentPage;
    const endIndex = startIndex + this.itemsPerAntecedentPage;
    return this.antecedents.slice(startIndex, endIndex);
  }
  
  // Changer de page
  changeAntecedentPage(page: number): void {
    this.currentAntecedentPage = page;
  }

}
