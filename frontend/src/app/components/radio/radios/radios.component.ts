import { Component, OnInit } from '@angular/core';
import { RadioService } from '../../../services/radio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  imports: [CommonModule],
  styleUrls: ['./radios.component.css']
})
export class RadiosComponent implements OnInit {
  radios: any[] = []; // Liste des radios
  filePreviewUrl: string | null = null; // URL de prévisualisation
  paginatedRadios: any[] = []; // Radios paginées pour l'affichage
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 5; // Nombre d'éléments par page
  popupVisible: boolean = false; // État du popup "Ajouter une image"
  showImageModal: boolean = false; // État du modal pour voir l'image
  selectedRadio: any = null; // Radio sélectionnée
  selectedRadioImageUrl: string | null = null; // URL de l'image de la radio
  selectedImagePreview: string | null = null; // URL pour l'aperçu de l'image
  fileToUpload: File | null = null; // Fichier à uploader
  Math=Math;
  constructor(private radioService: RadioService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchRadios(); // Charger les radios au démarrage
  }

  // Méthode pour récupérer les radios depuis le backend
  fetchRadios(): void {
    this.radioService.getRadios().subscribe(
      (data: any[]) => {
        this.radios = data;
        this.updatePagination();
      },
      (error) => {
        console.error('Erreur lors de la récupération des radios :', error);
      }
    );
  }

  // Mise à jour de la pagination
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRadios = this.radios.slice(start, end);
  }

  // Changer de page
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // Ouvrir le popup pour ajouter une image
  ajouterImageRadio(radio: any): void {
    this.selectedRadio = radio;
    this.popupVisible = true;
  }

  // Fermer le popup
  
closePopup(): void {
  this.popupVisible = false;
  this.fileToUpload = null;
  this.filePreviewUrl = null;
}

  // Gérer la sélection d'un fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
  
      // Créez un aperçu de l'image sélectionnée
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.fileToUpload && this.selectedRadio) {
      const imageName = this.fileToUpload.name; // Obtenir le nom du fichier
      const updatedRadio = {
        ...this.selectedRadio,
        fichier: `assets/uploads/${imageName}`, 
        statut: 'Traité', // Mettre à jour le statut à "Traité"
      };
  
      // Appeler le service pour mettre à jour la radio dans le backend factice
      this.radioService.updateRadio(updatedRadio).subscribe(
        () => {
          console.log('Image enregistrée et statut mis à jour avec succès.');
          this.fetchRadios(); // Recharger les radios pour voir la mise à jour
          this.closePopup(); // Fermer le popup
        },
        (error) => {
          console.error("Erreur lors de l'enregistrement de l'image :", error);
        }
      );
    } else {
      console.error('Aucun fichier ou radio sélectionné.');
    }
  }
  
  

  // Voir l'image de la radio
  voirImageRadio(radio: any): void {
    this.selectedRadio = radio;
    this.selectedRadioImageUrl = radio.fichier; 
    this.showImageModal = true;
  }
  

  // Fermer le modal d'image
  closeImage(): void {
    this.showImageModal = false;
    this.selectedRadioImageUrl = null;
  }
  //drag droooop
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Empêche le comportement par défaut (comme l'ouverture du fichier dans le navigateur).
    event.stopPropagation();
    this.isDragOver = true; // Activer la bordure verte

  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false; // Activer la bordure verte

  
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFileInput(file); 
    }
  }
  
  handleFileInput(file: File): void {
    if (file) {
      this.fileToUpload = file;
  
      // Créer un aperçu du fichier (si nécessaire)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
  
      console.log('Fichier sélectionné :', file.name);
    }
  }


  isDragOver: boolean = false; // État de drag



}