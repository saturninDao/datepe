import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from '../app/services/auth-guard.service';
import { AuthService } from '../app/services/auth.service';
import { ContactService } from '../app/services/contact.service';
import { HomeService } from '../app/services/home.service';
import { ProprietairesService } from '../app/services/proprietaires.service';
import { SallesService } from '../app/services/salles.service';

const appRoutes: Routes = [
  { path: 'auth/inscription', component: InscriptionComponent},
  { path: 'auth/connexion', component: ConnexionComponent},
  { path: 'accueil', component: HomeComponent},
  { path: 'salles', component: SallesComponent},
  { path: 'salles/new', component: SalleFormComponent},
  { path: 'salles/view/:id', component: SingleSalleComponent },
  { path: 'proprietaires', component: ProrietairesComponent},
  { path: 'proprietaires/view/:id', component: SingleProprietaireComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', component: HomeComponent}
]



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
    SingleProprietaireComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ContactService,
    HomeService,
    ProprietairesService,
    SallesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
