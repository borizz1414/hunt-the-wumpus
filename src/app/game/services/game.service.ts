import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsGameInterface } from '../interfaces/game.interface';
import { GameState } from '../states/game.state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private gameState: GameState) { }

  setSettings(settings: SettingsGameInterface): void {
    localStorage.setItem('config', JSON.stringify(settings));
    this.gameState.setSettingsValue(settings);
  }

  getSettings(): Observable<SettingsGameInterface> {
    return this.gameState.getSettingsValue();
  }
}
