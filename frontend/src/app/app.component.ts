import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NosChiffresComponent } from "./components/nos-chiffres/nos-chiffres.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPageComponent, NosChiffresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
