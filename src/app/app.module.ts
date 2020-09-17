import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AppRoutingModule } from '../app/app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LesSallesComponent } from './admin/lesSalles/lesSalles.component';
import { UtilisateursComponent } from './admin/utilisateurs/utilisateurs.component';
import { CompteComponent } from './admin/compte/compte.component';
import { EditSallesComponent } from './admin/lesSalles/edit-salles/edit-salles.component';
import { InfoSallesComponent } from './admin/lesSalles/info-salles/info-salles.component';
import { DeleteSallesComponent } from './admin/lesSalles/delete-salles/delete-salles.component';
import { AddSallesComponent } from './admin/lesSalles/add-salles/add-salles.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MyConfig } from '../app/config/config';

import { AuthGuardService } from '../app/services/auth-guard.service';
import { AdminProprioGuardService } from '../app/services/admin-proprio-guard.service'
import { AuthService } from '../app/services/auth.service';
import { ContactService } from '../app/services/contact.service';
import { HomeService } from '../app/services/home.service';
import { ProprietairesService } from '../app/services/proprietaires.service';
import { SallesService } from '../app/services/salles.service';
import { from } from 'rxjs';
import { EditUtilisateursComponent } from './admin/utilisateurs/edit-utilisateurs/edit-utilisateurs.component';
import { InfoUtilisateursComponent } from './admin/utilisateurs/info-utilisateurs/info-utilisateurs.component';
import { DeleteUtilisateursComponent } from './admin/utilisateurs/delete-utilisateurs/delete-utilisateurs.component';
import { TruncateTextPipe } from './truncate-textng.pipe';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavComponent } from './admin/common/nav/nav.component';
import { environment } from 'src/environments/environment';

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
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  { path: 'admin/dashboard', canActivate:[AuthGuardService], component: DashboardComponent},
  { path: 'admin/lessalles', canActivate:[AuthGuardService], component: LesSallesComponent },
  { path: 'admin/utilisateurs', canActivate:[AuthGuardService,AdminProprioGuardService], component: UtilisateursComponent},  
  { path: 'admin/utilisateurs/info-utilisateurs', canActivate:[AuthGuardService,AdminProprioGuardService], component: InfoUtilisateursComponent},
  { path: 'admin/utilisateurs/edit-utilisateurs/:id', canActivate:[AuthGuardService,AdminProprioGuardService], component: EditUtilisateursComponent},
  { path: 'admin/utilisateurs/delete-utilisateurs', canActivate:[AuthGuardService,AdminProprioGuardService], component: DeleteUtilisateursComponent},
  { path: 'admin/compte', canActivate:[AuthGuardService], component: CompteComponent},
  { path: 'admin/lessalles/add-salles', canActivate:[AuthGuardService], component: AddSallesComponent},
  { path: 'admin/lessalles/delete-salles/:id', canActivate:[AuthGuardService], component: DeleteSallesComponent},
  { path: 'salles/edit/:id', canActivate:[AuthGuardService], component: EditSallesComponent},
  { path: 'admin/lessalles/info-salles/view/:id', canActivate:[AuthGuardService], component: InfoSallesComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
  { path: '**', redirectTo: 'accueil'}
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
    AdminComponent,
    DashboardComponent,
    LesSallesComponent,
    UtilisateursComponent,
    CompteComponent,
    EditSallesComponent,
    InfoSallesComponent,
    DeleteSallesComponent,
    AddSallesComponent,
    EditUtilisateursComponent,
    InfoUtilisateursComponent,
    DeleteUtilisateursComponent,
    TruncateTextPipe,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OwlModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    LazyLoadImageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ContactService,
    HomeService,
    ProprietairesService,
    SallesService,
    MyConfig,
    AdminProprioGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
