import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nos-chiffres',
  imports: [],
  templateUrl: './nos-chiffres.component.html',
  styleUrl: './nos-chiffres.component.css'
})
export class NosChiffresComponent implements OnInit {
  progress: number = 0;
  readonly targetProgress: number = 92;

  ngOnInit() {
    const timer = setInterval(() => {
      if (this.progress >= this.targetProgress) {
        clearInterval(timer);
        this.progress = this.targetProgress;
      } else {
        this.progress++;
      }
    }, 30);
  }


}

