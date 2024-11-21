import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  isProfileCardOpen = false;

  toggleProfileCard() {
    this.isProfileCardOpen = !this.isProfileCardOpen;
  }
}
