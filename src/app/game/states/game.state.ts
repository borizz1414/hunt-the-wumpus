import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsGameInterface } from '@app/game/interfaces/game.interface';
@Injectable()
export class GameState {
  private settings = new BehaviorSubject<SettingsGameInterface>({} as SettingsGameInterface);

  get settingsValue(): SettingsGameInterface {
    return this.settings.value;
  }

  setSettingsValue(settings: SettingsGameInterface): void {
    this.settings.next(settings);
  }

  getSettingsValue(): Observable<SettingsGameInterface> {
    return this.settings.asObservable();
  }
}
