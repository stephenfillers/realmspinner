import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Functions } from '@angular/fire/functions';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css',
})
export class ToolsComponent {
  firebaseFunctions = inject(Functions);
  http = inject(HttpClient);
  authService = inject(AuthService);

  endpoint =
    'https://us-central1-realmspinner-b4902.cloudfunctions.net/generateBackstory';

  generateStory() {
    this.authService.idToken$.subscribe((token) => {
      if (token) {
        console.log('The token', token);
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token!,
          }),
        };
        const data = {
          characterRace: 'Tiefling',
          characterClass: 'Bard',
          characterName: 'Verity',
        };
        this.http
          .post(this.endpoint, data, headerOptions)
          .subscribe((response) => {
            console.log('The response', response);
          });
      }
    });
  }
}
