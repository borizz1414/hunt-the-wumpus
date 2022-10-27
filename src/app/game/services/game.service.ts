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
    this.gameState.setSettingsValue(settings);
  }

  getSettings(): Observable<SettinsGameInterface> {
    return this.gameState.getSettingsValue();
  }
}
