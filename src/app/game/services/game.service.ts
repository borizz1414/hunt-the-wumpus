import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettinsGameInterface } from '../interfaces/game.interface';
import { GameState } from '../states/game.state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private gameState: GameState) { }

  setSettings(settings: SettinsGameInterface): void {
    localStorage.setItem('config', JSON.stringify(settings));
    this.gameState.setSettingsValue(settings);
  }

  getSettings(): Observable<SettinsGameInterface> {
    return this.gameState.getSettingsValue();
  }
}
