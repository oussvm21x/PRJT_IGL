import { Component } from '@angular/core';
import { NosUserComponent } from "../nos-user/nos-user.component";

@Component({
  selector: 'app-landing-page',
  imports: [NosUserComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
