import { Component } from '@angular/core';
// import 'bootstrap/dist/js/bootstrap.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = 'MyApp';
  sideNavStatus: boolean = false;
}
