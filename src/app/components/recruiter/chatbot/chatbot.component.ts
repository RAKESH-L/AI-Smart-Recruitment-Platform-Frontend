import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  isPopupVisible: boolean = false;
  userInput: string = '';
  userId: number;
  retrievedId: number;
  messageString: string = 'F';
  optionMessage: string = '';
  botResponseCache: string;
  phoneNumber: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isProfileVisible: boolean = false;
  isDiscordWindowVisible: boolean = false;
  mailId: String = 'rakesh.lokesh@gmail.com';

  message: string = '';  // Holds the current input message
  // messages: Array<{ type: string, text: string }> = []; // Array to hold chat messages

  

  // Define variables to hold form input values
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  pinCode: string = '';


  sendMessage() {
    
  }

  // Toggles the visibility of the popup window
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  doAction1() {
    console.log('Option 1 selected');
    this.isPopupVisible = false; // Close the popup after selecting an option
  }

  doAction2() {
    console.log('Option 2 selected');
    this.isPopupVisible = false;
  }

  doAction3() {
    console.log('Option 3 selected');
    this.isPopupVisible = false;
  }

  showProfile(): void {
    this.isProfileVisible = true;
    this.isDiscordWindowVisible = false

  }
  showDiscordWindow(): void {
    this.isDiscordWindowVisible = true
    this.isProfileVisible = false;

  }

  openSettings() {
    console.log('Settings icon clicked!');
    // Logic for opening settings or performing any action
  }
}
