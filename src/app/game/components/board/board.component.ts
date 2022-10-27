import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SettinsGameInterface } from '@app/game/interfaces/game.interface';
import { GameService } from '@app/game/services/game.service';
import { fromEvent, Subscription, tap } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  cells: number[] = [];
  pits?: any;
  arrows?: number;
  gold?: number;
  wumpus?: number;
  stench?: any;
  breeze?: number;
  brightness: any;
  subscription!: Subscription;

  @ViewChild('hunter') hunter?: ElementRef<any>;
  @ViewChild('heightCells') heightCells?: ElementRef<any>;
  constructor(private gameService: GameService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getSettings();
    fromEvent(window, 'keyup.esc', () => {
      console.log('d')
    });
    let pxY = 0;
    let pxX = 0;
    const keyDowns = fromEvent(document, 'keydown').pipe(
      distinctUntilChanged()
    );
    this.subscription = keyDowns.subscribe((escpress: any) => {
      console.log(escpress)
      if (escpress.key === 'ArrowDown') {
        // Do your thing
        console.log('escape key ArrowDown');
        console.log(pxY, 'px')
        console.log(this.heightCells?.nativeElement.offsetHeight)
        if (this.hunter !== undefined && pxY < this.heightCells?.nativeElement.offsetHeight-80) {
          pxY = pxY + 80;
          this.renderer.setStyle(this.hunter.nativeElement, 'top', `${pxY}px`);
        }
      }
      if (escpress.key === 'ArrowUp') {
        // Do your thing
        console.log('escape key ArrowUp');
        if (this.hunter !== undefined && pxY > 0) {
          pxY = pxY - 80;
          this.renderer.setStyle(this.hunter.nativeElement, 'top', `${pxY}px`);
        }
      }
      if (escpress.key === 'ArrowRight') {
        // Do your thing
        console.log('escape key ArrowRight');
        console.log(pxY, 'px')
        if (this.hunter !== undefined && pxX < 240) {
          pxX = pxX + 80;
          this.renderer.setStyle(this.hunter.nativeElement, 'left', `${pxX}px`);
        }
      }
      if (escpress.key === 'ArrowLeft') {
        // Do your thing
        console.log('escape key ArrowLeft');
        console.log(pxY, 'px')
        if (this.hunter !== undefined && pxX > 0) {
          pxX = pxX - 80;
          this.renderer.setStyle(this.hunter.nativeElement, 'left', `${pxX}px`);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getSettings(): void {
    this.gameService.getSettings().pipe(tap((res: SettinsGameInterface) => {
      console.log(res, 'res')
      for (let i = 1; i <= res.cells; i++) {
        this.cells?.push(i);
      }
    })).subscribe((res: SettinsGameInterface) => {
      this.pits = res.pits;
      this.arrows = res.arrows;
      while (this.gold === this.wumpus && (this.gold !== 1 && this.wumpus !== 1)) {
        this.gold = this.getRandomIntInclusive();
        this.wumpus = this.getRandomIntInclusive();
        this.stench = [this.wumpus - 1, this.wumpus + 1, this.wumpus - 4, this.wumpus + 4];
        this.brightness = [this.gold - 1, this.gold + 1, this.gold - 4, this.gold + 4];
      }


    })
  }

  getRandomIntInclusive(): number {
    let min = this.cells[0]

    let max = this.cells[this.cells.length - 1]
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
