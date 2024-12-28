import { CommonModule } from '@angular/common'; // Importation du module commun pour les directives Angular comme ngIf et ngFor
import { Component, Input, Output, EventEmitter } from '@angular/core'; // Importation des décorateurs et classes nécessaires à la création de composants
import { RouterLink, RouterModule } from '@angular/router'; // Importation pour la gestion de la navigation et des routes dans Angular

// Décorateur @Component qui définit les métadonnées du composant
@Component({
  selector: 'app-left-sidebar', // Nom du sélecteur pour utiliser ce composant dans un template HTML
  standalone: true, // Indique que ce composant peut être utilisé sans module spécifique
  imports: [RouterModule, CommonModule], // Modules requis pour le fonctionnement de ce composant
  templateUrl: './left-sidebar.component.html', // Chemin du fichier de template HTML associé à ce composant
  styleUrls: ['./left-sidebar.component.css'], // Chemin du fichier de style CSS associé à ce composant
})

// Classe du composant 'LeftSidebarComponent'
export class LeftSidebarComponent {
  // Propriété @Input pour recevoir la valeur d'une variable parent (état de la barre latérale)
  @Input() isLeftSidebarCollapsed!: boolean;

  // Propriété @Output pour émettre un événement au parent lorsqu'une action est effectuée
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  // Liste des éléments affichés dans la barre latérale avec leurs propriétés : lien, icône et label
  items = [
    {
      routeLink: 'dashboard', // Lien vers la route associée
      icon: 'assets/icons/dashboard.svg', // Chemin de l'icône associée
      label: 'Dashboard', // Libellé affiché pour cet élément
    },
    {
      routeLink: 'profil',
      icon: 'assets/icons/profil.svg',
      label: 'Profil',
    },
    { 
      routeLink: 'historique',
      icon: 'assets/icons/historique.svg',
      label: 'Historique',

    },
    {
      routeLink: 'antecedents',
      icon: 'assets/icons/antecedents.svg',
      label: 'Antécédents',
    },

  ];

  // Objet représentant le bouton de déconnexion avec ses propriétés
  logout = {
    routeLink: 'logout', // Lien vers la route associée à la déconnexion
    icon: 'assets/icons/logout.svg', // Chemin de l'icône associée
    label: 'Se déconnecter', // Libellé affiché pour la déconnexion
  };

  // Méthode pour basculer l'état de la barre latérale (ouverte/fermée)
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed); // Émet l'état inversé au composant parent
  }

  // Méthode pour fermer la barre latérale
  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true); // Émet la valeur 'true' pour indiquer que la barre latérale doit être fermée
  }
}
