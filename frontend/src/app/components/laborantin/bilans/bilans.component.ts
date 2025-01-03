import { Component, OnInit } from '@angular/core';
import { BilanService } from '../../../services/bilans.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-bilans',
  templateUrl: './bilans.component.html',
  imports: [CommonModule,FormsModule],
  
  styleUrls: ['./bilans.component.css']
})
export class BilansComponent implements OnInit {
  bilans: any[] = []; // Liste complète des bilans
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 10; // Nombre d'éléments par page
   isLoading: boolean = true;
   Math=Math;
   popupVisible: boolean = false; // Gérer la visibilité de la popup
  selectedBilan: any = null; // Bilan sélectionné
  tests: any[] = []; // Liste des tests dynamiques


  constructor(private bilanService: BilanService) {}

  ngOnInit(): void {
    this.fetchBilans();
  }

  // Récupérer la liste des bilans
  fetchBilans(): void {
    this.bilanService.getBilans().subscribe(
      (data) => {
        this.bilans = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des bilans:', error);
        this.isLoading = false;
      }
    );
  }

  // Remplir un bilan non traité
  remplirBilan(bilan: any): void {
    console.log('Remplir le bilan:', bilan);
    // Ajouter votre logique ici
  }

  // Générer un graphe pour un bilan traité
  genererGraphe(bilan: any): void {
    console.log('Générer un graphe pour le bilan:', bilan);
    // Ajouter votre logique ici
  }
   // Méthode pour obtenir les bilans paginés
   get paginatedBilans() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.bilans.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  changePage(page: number): void {
    this.currentPage = page;
  }
   // Afficher la popup
   openPopup(bilan: any): void {
    this.selectedBilan = bilan;
    this.popupVisible = true;
    this.tests = []; // Réinitialiser les tests
  }

  // Fermer la popup
  closePopup(): void {
    this.popupVisible = false;
    this.selectedBilan = null;
    this.tests = [];
  }

  // Ajouter un test
  addTest(): void {
    this.tests.push({ nom: '', valeur: '', unite: '' });
  }

  // Supprimer un test
  removeTest(index: number): void {
    this.tests.splice(index, 1);
  }

  // Enregistrer les résultats
  saveResults(): void {
    console.log('Bilan à enregistrer :', this.selectedBilan);
    console.log('Tests :', this.tests);
    // Ajoutez ici la logique pour enregistrer les données
    this.closePopup();
  }
}
