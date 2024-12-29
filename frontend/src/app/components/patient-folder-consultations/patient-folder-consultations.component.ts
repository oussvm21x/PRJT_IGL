import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsultationComponent } from '../consultation/consultation.component';

@Component({
  selector: 'app-patient-folder-consultations',
  standalone: true,
  imports: [CommonModule, RouterModule,ConsultationComponent],
  templateUrl: './patient-folder-consultations.component.html',
  styleUrl: './patient-folder-consultations.component.css'
})
export class PatientFolderConsultationsComponent {

}
