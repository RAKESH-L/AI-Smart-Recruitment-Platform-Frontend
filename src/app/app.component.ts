import { Component, OnInit } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.js'; // Import Bootstrap JavaScript
// import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'MyApp';

  sideNavStatus: boolean = false;
  // isLoggedIn = false;

 

  ngOnInit() {
    // Simulate an API call
    
  }
}
