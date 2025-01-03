import { Component } from '@angular/core';
import { NosChiffresComponent } from "../nos-chiffres/nos-chiffres.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSectionComponent, CommonModule,NosChiffresComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
