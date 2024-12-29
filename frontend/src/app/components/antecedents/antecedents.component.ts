import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AntecedentComponent } from "../antecedent/antecedent.component";
import { PatientFolderAntecedentsComponent } from '../patient-folder-antecedents/patient-folder-antecedents.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, PatientFolderAntecedentsComponent],
  templateUrl: './antecedents.component.html',
  styleUrl: './antecedents.component.css',
})
export class AntecedentsComponent {}
