import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  private darkTheme: boolean = false;

  toggleTheme() {
      this.darkTheme = !this.darkTheme;
      if (this.darkTheme) {
          document.body.classList.add('dark-theme');
      } else {
          document.body.classList.remove('dark-theme');
      }
  }
}
