import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nos-chiffres',
  templateUrl: './nos-chiffres.component.html',
  styleUrl: './nos-chiffres.component.css'
})
export class NosChiffresComponent implements OnInit {
  progress1: number = 0;
  progress2: number = 0;
  progress3: number = 0;
  progress4: number = 0;

  readonly targetProgress1: number = 97;
  readonly targetProgress2: number = 500;
  readonly targetProgress3: number = 900;
  readonly targetProgress4: number = 200;

  ngOnInit() {
    const interval = setInterval(() => {
      // Update progress1 with dynamic step
      if (this.progress1 < this.targetProgress1) {
        this.progress1 += this.calculateStep(this.progress1, this.targetProgress1);
      }

      // Update progress2 with dynamic step
      if (this.progress2 < this.targetProgress2) {
        this.progress2 += this.calculateStep(this.progress2, this.targetProgress2);
      }

      // Update progress3 with dynamic step
      if (this.progress3 < this.targetProgress3) {
        this.progress3 += this.calculateStep(this.progress3, this.targetProgress3);
      }

      // Update progress4 with dynamic step
      if (this.progress4 < this.targetProgress4) {
        this.progress4 += this.calculateStep(this.progress4, this.targetProgress4);
      }

      // Ensure values do not exceed targets
      this.progress1 = Math.min(this.progress1, this.targetProgress1);
      this.progress2 = Math.min(this.progress2, this.targetProgress2);
      this.progress3 = Math.min(this.progress3, this.targetProgress3);
      this.progress4 = Math.min(this.progress4, this.targetProgress4);

      // Clear interval when all targets are reached
      if (
        this.progress1 >= this.targetProgress1 &&
        this.progress2 >= this.targetProgress2 &&
        this.progress3 >= this.targetProgress3 &&
        this.progress4 >= this.targetProgress4
      ) {
        clearInterval(interval);
      }
    }, 8);
  }

  calculateStep(current: number, target: number): number {
    const remaining = target - current;

    // Use a formula to gradually reduce step size as remaining decreases
    if (remaining > 200) {
      return Math.ceil(remaining * 0.2); // 20% of the remaining value
    } else if (remaining > 100) {
      return Math.ceil(remaining * 0.1); // 10% of the remaining value
    } else if (remaining > 50) {
      return Math.ceil(remaining * 0.05); // 5% of the remaining value
    } else if (remaining > 10) {
      return Math.ceil(remaining * 0.02); // 2% of the remaining value
    }
    return 1; // Final small steps for precise increments
  }

}
