import { Component } from '@angular/core';
import { FaqComponent } from "../faq/faq.component";
import { CommentComponent } from "../comment/comment.component";
import { NosUserComponent } from "../nos-user/nos-user.component";
import { NosFonctsComponent } from "../nos-foncts/nos-foncts.component";
import { NosChiffresComponent } from "../nos-chiffres/nos-chiffres.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSectionComponent,FaqComponent, CommentComponent, CommonModule,NosChiffresComponent,NosFonctsComponent,NosUserComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
