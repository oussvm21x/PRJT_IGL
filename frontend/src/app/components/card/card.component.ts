import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() mainImage: string = ''; // Path to the main image
  @Input() altText: string = 'User Image'; // Alt text for the image
  @Input() title: string = 'Default Title'; // Title text
  @Input() description: string = 'Default description text.'; // Description text
  @Input() citationImage1: string = ''; // Path to Citation 1 image
  @Input() citationImage2: string = ''; // Path to Citation 2 image

  @Output() cardClick = new EventEmitter<void>(); // Event emitter for click event

  onCardClick(): void {
    this.cardClick.emit();
  }
}
