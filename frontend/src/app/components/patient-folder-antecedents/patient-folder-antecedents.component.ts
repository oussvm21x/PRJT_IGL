import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AntecedentComponent } from '../antecedent/antecedent.component';

@Component({
  selector: 'app-patient-folder-antecedents',
  standalone: true,
  imports: [CommonModule, RouterModule ,AntecedentComponent],
  templateUrl: './patient-folder-antecedents.component.html',
  styleUrl: './patient-folder-antecedents.component.css'
})
export class PatientFolderAntecedentsComponent {

}
