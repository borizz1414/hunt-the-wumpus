import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from '@game/game-routing.module';
import { SettingsComponent } from '@game/components/settings/settings.component';
import { BoardComponent } from '@game/components/board/board.component';
import { StartGameContainer } from './containers/start-game/start-game.container';
import { PlayContainer } from './containers/play/play.container';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
    BoardComponent,
    StartGameContainer,
    PlayContainer,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
