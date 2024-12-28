import { Component } from '@angular/core';
import { NosChiffresComponent } from "../nos-chiffres/nos-chiffres.component";

@Component({
  selector: 'app-landing-page',
  imports: [NosChiffresComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
