import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { ConsultationService } from '../../../services/consultation.service';
import { AntecedentService } from '../../../services/antecedent.service';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { SoinsService } from '../../../services/soins.service';

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
  showSoinstModal: boolean = false;
  patient: any;
  consultations: any[] = [];
  antecedents: any[] = [];
  soins: any[] = [];
  patientForm!: FormGroup;
  consultationForm!: FormGroup;
  antecedentForm!: FormGroup;
  soinsForm!: FormGroup;
  bilansBiologiques!: FormArray; // Ajout de la propriété
  nss!: string;
  activeTab: string = 'soins';
  showModal: boolean = false;
  paginatedSoins: any[] = []; // Soins for the current page
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private antecedentService: AntecedentService,
    private soinsService: SoinsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.nss = this.route.snapshot.paramMap.get('nss')!;
    this.initForms();
    this.initConsultationForm(); // Initialisation du formulaire de consultation
    this.loadPatient();
    this.loadConsultations();
    this.loadAntecedents(); // Charger les antécédents
    this.addTest();
    this.loadSoins();
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
    this.soinsForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      observations: ['', Validators.required
      ]
    });


  }

  initConsultationForm(): void {
    this.consultationForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      resume: ['', Validators.required],
      bilans: this.fb.group({
        radio: ['', Validators.required], // Champ pour 'radio'
        biologique: this.fb.array([]),    // Tableau dynamique pour 'biologique'
      }),
      ordonnance: this.fb.array([]),       // Tableau dynamique pour les médicaments
    });

    // Accès rapide à bilans.biologique
    this.bilansBiologiques = this.consultationForm.get('bilans.biologique') as FormArray;
  }





  // Ajouter un test biologique
  addTest(): void {
    this.bilansBiologiques.push(
      this.fb.group({
        nom: ['', Validators.required],
      })
    );
  }




  // Supprimer un test biologique
  removeTest(index: number): void {
    this.bilansBiologiques.removeAt(index);
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
        this.consultations = data.map((consultation) => ({
          ...consultation,
          bilans: {
            radio: consultation.bilans?.radio || '',
            biologique: consultation.bilans?.biologique || [],
          },
          ordonnance: consultation.ordonnance || [],
        }));
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
  toggleSoinsModal(): void {
    this.showSoinstModal = !this.showSoinstModal;
    if (!this.showSoinstModal) {
      this.soinsForm.reset();
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
  downloadBilanBiologiquePDF(biologique: any[]): void {
    const doc = new jsPDF();

    // Titre du document
    doc.setFontSize(18);
    doc.text('Bilan Biologique', 10, 10);

    // Contenu des bilans biologiques
    doc.setFontSize(12);
    let y = 20; // Position initiale
    biologique.forEach((test, index) => {
      doc.text(`${index + 1}. ${test.nom}`, 10, y);
      y += 10; // Espacement entre chaque ligne
    });

    // Sauvegarder le fichier PDF
    doc.save('Bilan_Biologique.pdf');
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

  newSoin = {
    nom: '',
    description: '',
    observations: '',
  };
  submitSoin(): void {
    console.log('Button clicked!');
    if (this.soinsForm.valid) {
      const newSoin = this.soinsForm.value;
      console.log('Submitting soin:', newSoin); // Add a log to confirm the method is called
      this.soinsService.addSoin(newSoin).subscribe(
        (response) => {
          alert('Soin ajouté avec succès !');
          this.toggleSoinsModal();
          this.soinsForm.reset();
          this.loadSoins();
        },
        (error) => {
          console.error('Erreur lors de l’ajout du soin:', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  resetForm(): void {
    this.newSoin = {
      nom: '',
      description: '',
      observations: '',
    };
  }

  loadSoins(): void {
    this.soinsService.getSoins().subscribe({
      next: (data) => {
        this.soins = data;
        this.totalPages = Math.ceil(this.soins.length / this.itemsPerPage);
        console.log('Soins:', this.soins);
        this.updatePagination();
        
        console.log('pagiated:', this.paginatedSoins);
      },
      error: (err) => console.error('Error fetching soins:', err)
    });

    
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedSoins = this.soins.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  




}
