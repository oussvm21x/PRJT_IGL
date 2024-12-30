import { Component } from '@angular/core';
import { SoinComponent } from '../soin/soin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-folder-soins',
  imports: [CommonModule, RouterModule ,SoinComponent],
  templateUrl: './patient-folder-soins.component.html',
  styleUrl: './patient-folder-soins.component.css'
})
export class PatientFolderSoinsComponent {

}
