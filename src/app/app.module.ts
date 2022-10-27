import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@layout/components/header/header.component';
import { FooterComponent } from '@layout/components/footer/footer.component';
import { GameService } from '@game/services/game.service';
import { GameState } from '@game/states/game.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService, GameState],
  bootstrap: [AppComponent]
})
export class AppModule { }
