import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-layout',
  templateUrl: './candidate-layout.component.html',
  styleUrl: './candidate-layout.component.css'
})
export class CandidateLayoutComponent {
  title = 'MyApp';
  sideNavStatus: boolean = false;
}
