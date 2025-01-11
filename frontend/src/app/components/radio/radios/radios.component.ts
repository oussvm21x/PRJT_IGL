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
  paginatedRadios: any[] = []; // Radios paginées pour l'affichage
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 5; // Nombre d'éléments par page
  popupVisible: boolean = false; // État du popup "Ajouter une image"
  showImageModal: boolean = false; // État du modal pour voir l'image
  selectedRadio: any = null; // Radio sélectionnée
  selectedRadioImageUrl: string | null = null; // URL de l'image de la radio
  fileToUpload: File | null = null; // Fichier à uploader

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
  }

  // Gérer la sélection d'un fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
    }
  }

  // Enregistrer l'image dans le backend
  uploadImage(): void {
    if (this.fileToUpload && this.selectedRadio) {
      const formData = new FormData();
      formData.append('image', this.fileToUpload);
      formData.append('radioId', this.selectedRadio.id);

      this.radioService.uploadImage(formData).subscribe(
        () => {
          this.fetchRadios(); // Recharger les radios après l'upload
          this.closePopup();
        },
        (error) => {
          console.error('Erreur lors de l\'upload de l\'image :', error);
        }
      );
    }
  }

  // Voir l'image de la radio
  voirImageRadio(radio: any): void {
    this.selectedRadio = radio;
    this.selectedRadioImageUrl = radio.imageUrl; // Supposons que `imageUrl` contient l'URL de l'image
    this.showImageModal = true;
  }

  // Fermer le modal d'image
  closeImage(): void {
    this.showImageModal = false;
    this.selectedRadioImageUrl = null;
  }
}