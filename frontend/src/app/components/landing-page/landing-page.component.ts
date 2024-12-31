import { Component } from '@angular/core';
import { CommentComponent } from "../comment/comment.component";

@Component({
  selector: 'app-landing-page',
  imports: [CommentComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
