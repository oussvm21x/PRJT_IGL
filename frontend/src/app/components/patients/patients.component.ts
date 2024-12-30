import { Component } from '@angular/core';
import { PatientFolderComponent } from '../patient-folder/patient-folder.component';

@Component({
  selector: 'app-patients',
  imports: [PatientFolderComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

}
