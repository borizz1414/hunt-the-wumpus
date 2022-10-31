import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@app/game/services/game.service';

@Component({
  selector: 'app-play-container',
  templateUrl: './play.container.html',
  styleUrls: ['./play.container.scss']
})
export class PlayContainer implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.hasOwnProperty("config")) {
      const config = localStorage.getItem('config');
      if (config) this.gameService.setSettings(JSON.parse(config));
    } else {
      this.router.navigate(['/start-game'])
    }
  }

}
