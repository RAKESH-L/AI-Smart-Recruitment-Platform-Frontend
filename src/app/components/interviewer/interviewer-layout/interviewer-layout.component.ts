import { Component } from '@angular/core';

@Component({
  selector: 'app-interviewer-layout',
  templateUrl: './interviewer-layout.component.html',
  styleUrl: './interviewer-layout.component.css'
})
export class InterviewerLayoutComponent {
  title = 'MyApp';
  sideNavStatus: boolean = false;
  menuLocked: boolean = false; // Indicates whether the menu is locked

  // Toggle sidebar lock state
  toggleSidebar(): void {
    this.menuLocked = !this.menuLocked; // Toggle lock status
    this.sideNavStatus = this.menuLocked; // Set sidebar state based on lock
  }

  // Methods for expanding/collapsing sidebar on hover
  openSidebar(): void {
    if (!this.menuLocked) {
      this.sideNavStatus = true;
    }
  }

  closeSidebar(): void {
    if (!this.menuLocked) {
      this.sideNavStatus = false;
    }
  }

  // Mouse events for sidebar hover behavior
  onMouseEnterSidebar(): void {
    this.openSidebar();
  }

  onMouseLeaveSidebar(): void {
    this.closeSidebar();
  }
}
