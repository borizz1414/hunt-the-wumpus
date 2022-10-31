import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsGameInterface } from '@app/game/interfaces/game.interface';
import { GameService } from '@app/game/services/game.service';
import { fromEvent, Subscription, tap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  cells: number[] = [];
  pits: number[] = [];
  pit = 0;
  arrows!: number;
  gold?: number;
  wumpus?: number;
  stench: number[] = [];
  breeze: number[] = [];
  brightness: number[] = [];
  hunterPosition = 1;
  goldCollected = false;
  resultMessage = '';
  subscription = new Subscription();
  finish = false;
  deadWumpus = false;
  @ViewChild('hunter') hunter?: ElementRef<any>;
  @ViewChild('heightCells') heightCells?: ElementRef<any>;
  constructor(private gameService: GameService, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.startGame();
  }


  getSettings(): Subscription {
    return this.gameService.getSettings().pipe(tap((res: SettingsGameInterface) => {
      for (let i = 1; i <= res.cells; i++) {
        this.cells?.push(i);
      }
      while (this.gold === this.wumpus || this.gold === 1 || this.wumpus === 1) {
        this.gold = this.getRandomIntInclusive();
        this.wumpus = this.getRandomIntInclusive();
        this.stench = [this.wumpus - 1, this.wumpus + 1, this.wumpus - 4, this.wumpus + 4];
        this.brightness = [this.gold - 1, this.gold + 1, this.gold - 4, this.gold + 4];
      }
      for (let i = 1; i <= res.pits; i++) {
        console.log(i, 'pozo')
        do {
          this.pit = this.getRandomIntInclusive();

        } while (this.pit === this.wumpus || this.pit === this.gold || this.pit === 1 || this.pits.indexOf(this.pit) >= 0)
        if (this.pit !== this.wumpus && this.pit !== this.gold && this.pit !== 1) {
          this.pits.push(this.pit);
          this.breeze.push(this.pit - 1, this.pit + 1);
        }
      }
    })).subscribe((res: SettingsGameInterface) => {
      this.arrows = res.arrows;
    })
  }

  getRandomIntInclusive(): number {
    let min = this.cells[0]
    let max = this.cells[this.cells.length - 1]
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  selectCell(index: any): void {
    if (index === this.gold && this.hunterPosition === index) {
      this.resultMessage = "Oro recogido ve a la salida"
    } else if (this.arrows >= 1) {
      this.arrows--;
      if (index === this.wumpus) {
        this.resultMessage = 'Matastes al wumpus!';
        this.deadWumpus = true;
        const audio = new Audio('assets/sounds/kill-wumpus.mp3');
        audio.play();
      }
      const audio = new Audio('assets/sounds/arco.mp3');
      audio.play();
    } else if (!this.finish) {
      this.resultMessage = " No tienes flechas"
    }

  }

  startGame(): void {
    this.pits = [];
    this.breeze = [];
    this.subscription.add(this.getSettings());
    let positionY = 0;
    let positionX = 0;

    const keyDowns = fromEvent(document, 'keydown').pipe(
      distinctUntilChanged()
    );
    this.subscription.add(keyDowns.subscribe((press: KeyboardEventInit) => {
      if (!this.finish) {
        if (press.key === 'ArrowDown') {
          if (this.hunter !== undefined && positionY < this.heightCells?.nativeElement.offsetHeight - 120) {
            this.hunterPosition = this.hunterPosition + 4
            positionY = positionY + 120;
            this.renderer.setStyle(this.hunter.nativeElement, 'top', `${positionY}px`);
          }
        }
        if (press.key === 'ArrowUp') {
          if (this.hunter !== undefined && positionY > 0) {
            this.hunterPosition = this.hunterPosition - 4
            positionY = positionY - 120;
            this.renderer.setStyle(this.hunter.nativeElement, 'top', `${positionY}px`);
          }
        }
        if (press.key === 'ArrowRight') {
          if (this.hunter !== undefined && positionX < 240) {
            this.hunterPosition = this.hunterPosition + 1
            positionX = positionX + 80;
            this.renderer.setStyle(this.hunter.nativeElement, 'left', `${positionX}px`);
          }
        }
        if (press.key === 'ArrowLeft') {
          if (this.hunter !== undefined && positionX > 0) {
            this.hunterPosition = this.hunterPosition - 1
            positionX = positionX - 80;
            this.renderer.setStyle(this.hunter.nativeElement, 'left', `${positionX}px`);
          }
        }
        if (this.hunterPosition === 1 && this.goldCollected) {
          this.resultMessage = 'Ganastes!'
          const audio = new Audio('assets/sounds/win.mp3');
          audio.play();
          this.finish = true;
        }
        if (this.hunterPosition === this.wumpus && !this.deadWumpus) {
          this.youLoser()
        }
        if (this.pits.indexOf(this.hunterPosition) >= 0) {
          this.youLoser()
        }
      }
    }));

  }

  resetGame(): void {
    location.reload()
  }

  youLoser(): void {
    this.resultMessage = 'Perdistes!';
    this.finish = true;
    const audio = new Audio('assets/sounds/pits.mp3');
    audio.play();
  }
  collectGold(): void {
    if (!this.finish) this.goldCollected = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
