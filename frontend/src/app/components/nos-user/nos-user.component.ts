import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-nos-user',
  imports: [CardComponent],
  templateUrl: './nos-user.component.html',
  styleUrl: './nos-user.component.css'
})
export class NosUserComponent {

  onCardClick(): void {
    console.log('Card clicked!');
    // Add your custom logic here (e.g., navigate to another page or open a modal)
  }
  handleCardClick(): void {
    console.log('Card clicked!');
  }

}
