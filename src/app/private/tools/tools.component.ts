import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Functions } from '@angular/fire/functions';
import { AuthService } from '../../auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
})
export class ToolsComponent {
  firebaseFunctions = inject(Functions);
  http = inject(HttpClient);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  characterForm = this.fb.nonNullable.group({
    characterRace: ['', Validators.required],
    characterClass: ['', Validators.required],
    characterName: ['', Validators.required],
  });

  endpoint =
    'https://us-central1-realmspinner-b4902.cloudfunctions.net/generateBackstory';

  backStory: string[] = [];
  raceGroups = [
    // Humans
    {
      name: 'Humans',
      races: [
        { viewValue: 'Human', value: 'human' },
        { viewValue: 'Variant Human', value: 'variant-human' },
      ],
    },
    // Dwarves
    {
      name: 'Dwarves',
      races: [
        { viewValue: 'Mountain Dwarf', value: 'mountain-dwarf' },
        { viewValue: 'Hill Dwarf', value: 'hill-dwarf' },
      ],
    },
    // Elves
    {
      name: 'Elves',
      races: [
        { viewValue: 'High Elf', value: 'high-elf' },
        { viewValue: 'Wood Elf', value: 'wood-elf' },
        { viewValue: 'Dark Elf (Drow)', value: 'dark-elf' }, // Drow are technically subrace of Dark Elf, but including them here for clarity
      ],
    },
    // Halflings
    {
      name: 'Halflings',
      races: [
        { viewValue: 'Lightfoot Halfling', value: 'lightfoot-halfling' },
        { viewValue: 'Stout Halfling', value: 'stout-halfling' },
      ],
    },
    // Dragonborn
    {
      name: 'Dragonborn',
      races: [
        { viewValue: 'Chromatic Dragonborn', value: 'chromatic-dragonborn' },
        { viewValue: 'Metallic Dragonborn', value: 'metallic-dragonborn' },
      ],
    },
    // Gnomes
    {
      name: 'Gnomes',
      races: [
        { viewValue: 'Forest Gnome', value: 'forest-gnome' },
        { viewValue: 'Rock Gnome', value: 'rock-gnome' },
      ],
    },
    // Tieflings
    {
      name: 'Tieflings',
      races: [
        { viewValue: 'Tiefling', value: 'tiefling' }, // Tieflings don't have subraces in official materials
      ],
    },
    // Others (Races added in later sourcebooks)
    {
      name: 'Others',
      races: [
        { viewValue: 'Aasimar', value: 'aasimar' },
        { viewValue: 'Bugbear', value: 'bugbear' },
        { viewValue: 'Firbolg', value: 'firbolg' },
        { viewValue: 'Goblin', value: 'goblin' },
        { viewValue: 'Hobgoblin', value: 'hobgoblin' },
        { viewValue: 'Kenku', value: 'kenku' },
        { viewValue: 'Kobold', value: 'kobold' },
        { viewValue: 'Lizardfolk', value: 'lizardfolk' },
        { viewValue: 'Orc', value: 'orc' },
        { viewValue: 'Tabaxi', value: 'tabaxi' },
        { viewValue: 'Tortle', value: 'tortle' },
        { viewValue: 'Triton', value: 'triton' },
        { viewValue: 'Yuan-ti Pureblood', value: 'yuan-ti-pureblood' },
      ],
    },
  ];

  classes = [
    { viewValue: 'Barbarian', value: 'barbarian' },
    { viewValue: 'Bard', value: 'bard' },
    { viewValue: 'Cleric', value: 'cleric' },
    { viewValue: 'Druid', value: 'druid' },
    { viewValue: 'Fighter', value: 'fighter' },
    { viewValue: 'Monk', value: 'monk' },
    { viewValue: 'Paladin', value: 'paladin' },
    { viewValue: 'Ranger', value: 'ranger' },
    { viewValue: 'Rogue', value: 'rogue' },
    { viewValue: 'Sorcerer', value: 'sorcerer' },
    { viewValue: 'Warlock', value: 'warlock' },
    { viewValue: 'Wizard', value: 'wizard' },
  ];

  generateStory() {
    this.authService.idToken$.subscribe((token) => {
      if (token) {
        const { characterRace, characterClass, characterName } =
          this.characterForm.getRawValue();

        console.log('The token', token);
        const headerOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token!,
          }),
        };
        const data = {
          characterRace,
          characterClass,
          characterName,
        };
        this.http
          .post(this.endpoint, data, headerOptions)
          .subscribe((response: any) => {
            this.backStory =
              response['response']['candidates'][0].content.parts[0].text.split(
                '\n\n',
              );
          });
      }
    });
  }
}
