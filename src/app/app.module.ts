import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { SallesComponent } from './salles/salles.component';
import { SingleSalleComponent } from './salles/single-salle/single-salle.component';
import { SalleFormComponent } from './salles/salle-form/salle-form.component';
import { ProrietairesComponent } from './prorietaires/prorietaires.component';
import { SingleProprietaireComponent } from "./prorietaires/single-proprietaire/single-proprietaire.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    InscriptionComponent,
    ConnexionComponent,
    SallesComponent,
    SingleSalleComponent,
    SalleFormComponent,
    ProrietairesComponent,
    SingleProprietaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
