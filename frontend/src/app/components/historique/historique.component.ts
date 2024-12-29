import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ConsultationComponent } from "../consultation/consultation.component";
import { PreNextBtnComponent } from '../preNextBtn/preNextBtn.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ConsultationComponent, PreNextBtnComponent],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css',
})
export class HistoriqueComponent {}
