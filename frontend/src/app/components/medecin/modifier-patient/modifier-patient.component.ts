import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConsultationService } from '../../../services/consultation.service';
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

  patient: any;
  consultations: any[] = [];
  patientForm!: FormGroup;
  consultationForm!: FormGroup;
  nss!: string;
  activeTab: string = 'profil';
  showModal: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nss = this.route.snapshot.paramMap.get('nss')!;
    this.initForm();
    this.initConsultationForm();
    this.loadPatient();
    this.loadConsultations();
  }

  initForm(): void {
    this.patientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      nss: [{ value: '', disabled: true }, Validators.required],
      mutuelle: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      contacts: this.fb.array(['']),
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
}
