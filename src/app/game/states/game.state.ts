import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettinsGameInterface } from '@app/game/interfaces/game.interface';
@Injectable()
export class GameState {
  private settings = new BehaviorSubject<SettinsGameInterface>({} as SettinsGameInterface);

  get settingsValue(): SettinsGameInterface {
    return this.settings.value;
  }

  setSettingsValue(settings: SettinsGameInterface): void {
    this.settings.next(settings);
  }

  getSettingsValue(): Observable<SettinsGameInterface> {
    return this.settings.asObservable();
  }
}
