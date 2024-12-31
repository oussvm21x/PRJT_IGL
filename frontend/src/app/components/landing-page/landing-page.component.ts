import { Component } from '@angular/core';
import { FaqComponent } from "../faq/faq.component";

@Component({
  selector: 'app-landing-page',
  imports: [FaqComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
