import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayContainer } from './containers/play/play.container';
import { StartGameContainer } from './containers/start-game/start-game.container';

const routes: Routes = [
  { path: 'start-game', component: StartGameContainer},
  { path: 'play', component: PlayContainer},
  { path: '**', redirectTo: 'start-game'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
