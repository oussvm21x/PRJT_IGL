import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consultation',
  imports: [CommonModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent {
  public consultationElements=['Ordennance' ,'Bilans' ,'Résumé'];

}
