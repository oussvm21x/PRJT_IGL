import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-faq-card',
  imports: [CommonModule],
  templateUrl: './faq-card.component.html',
  styleUrl: './faq-card.component.css'
})
export class FaqCardComponent {
  @Input() title: string = '';
  @Input() index: string = '';
  @Input() content: string = '';

  isVisible: boolean = false;


  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
