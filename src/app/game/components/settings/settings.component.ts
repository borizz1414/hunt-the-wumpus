import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '@app/game/services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  alertMessage?: string;
  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.settingsForm = this.fb.group({
      cells: [0, [Validators.required]],
      pits: [0, [Validators.required]],
      arrows: [0, [Validators.required]],
    });
  }

  start() {
    if (this.settingsForm.value.pits >= this.settingsForm.value.cells) {
      this.alertMessage = '¡El número de pozos debe ser menor que el de celdas!'
      setTimeout(() => this.alertMessage ='',5000)
    } else {
      this.gameService.setSettings(this.settingsForm.value);
      this.router.navigate(['/play'])

    }
  }

}
