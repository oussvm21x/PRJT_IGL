import { Component, OnInit } from '@angular/core';
import { BilanService } from '../../../services/bilans.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bilans',
  templateUrl: './bilans.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./bilans.component.css']
})
export class BilansComponent implements OnInit {
  bilans: any[] = []; // Liste complète des bilans
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 8; // Nombre d'éléments par page
  isLoading: boolean = true;
  Math = Math;
  popupVisible: boolean = false; // Gérer la visibilité de la popup
  selectedBilan: any = null; // Bilan sélectionné
  tests: any[] = []; // Liste des tests dynamiques
  showGraphModal: boolean = false;
  previousBilan: any = null;
  chartInstance: any = null;

  constructor(private bilanService: BilanService) {
    Chart.register(...registerables);
  }

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

  genererGraphe(bilan: any): void {
    this.selectedBilan = bilan;
    this.previousBilan = this.findPreviousBilan(bilan);
    this.showGraphModal = true;

    setTimeout(() => {
      this.renderGraph();
    }, 0); // Attendre que la popup soit visible avant de rendre le graphe
  }

  findPreviousBilan(currentBilan: any): any {
    return this.bilans
      .filter(
        (bilan) =>
          bilan.nss === currentBilan.nss && new Date(bilan.date) < new Date(currentBilan.date)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }

  renderGraph(): void {
    const ctx = document.getElementById('bilanChart') as HTMLCanvasElement;

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Détruire le graphe précédent
    }

    const labels = this.selectedBilan.tests.map((test: any) => test.nom);
    const currentData = this.selectedBilan.tests.map((test: any) => test.valeur);

    let datasets = [
      {
        label: 'Bilan Actuel',
        data: currentData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ];

    if (this.previousBilan) {
      const previousData = this.previousBilan.tests.map((test: any) => test.valeur);
      datasets.push({
        label: 'Bilan Précédent',
        data: previousData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      });
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Évolution des Tests pour NSS: ${this.selectedBilan.nss}`,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: !!this.previousBilan,
          },
          y: {
            stacked: !!this.previousBilan,
            beginAtZero: true,
          },
        },
      },
    });
  }

  closeGraph(): void {
    this.showGraphModal = false;
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Détruire le graphe lorsqu'on ferme la popup
      this.chartInstance = null;
    }
    this.selectedBilan = null;
    this.previousBilan = null;
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

  saveResults(): void {
    const allTestsFilled = this.selectedBilan.tests.every(
      (test: any) => test.valeur?.toString().trim() !== '' && test.unite?.trim() !== ''
    );

    if (!allTestsFilled) {
      alert('Veuillez remplir tous les champs des tests.');
      return;
    }

    // Mettre à jour le statut
    this.selectedBilan.status = 'traité';

    // Appeler le service pour sauvegarder les modifications
    this.bilanService.updateBilan(this.selectedBilan).subscribe(
      (updatedBilan) => {
        // Mettre à jour le tableau local
        const index = this.bilans.findIndex((b) => b.id === updatedBilan.id);
        if (index !== -1) {
          this.bilans[index] = updatedBilan;
        }
        this.closePopup(); // Fermer la popup
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du bilan:', error);
      }
    );
  }
}
