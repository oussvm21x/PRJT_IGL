import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SideBarComponent } from './components/side-bar/side-bar.component';





@Component({
  selector: 'app-root',
  imports: [SideBarComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ONE';
}
