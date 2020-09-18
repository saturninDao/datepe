import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from 'src/app/services/salles.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { AdminProprioGuardService } from 'src/app/services/admin-proprio-guard.service';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { MesImages } from 'src/app/models/mesimages.model';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-salles',
  templateUrl: './lesSalles.component.html',
  styleUrls: ['./lesSalles.component.css']
})
export class LesSallesComponent implements OnInit, OnDestroy {

  salles: Salle[] = [];
  salleSubscriber: Subscription = new Subscription();
  defaultLazyImage = '../../assets/images/chargement.gif';
  signedUserEmail: string;
  isSalleForMe: boolean;
  currentSalle: any;
  currentIndex: number;
  constructor(private sallesService: SallesService, 
    private router: Router, 
    private authService: AuthService, 
    private adminProprioG: AdminProprioGuardService,
    public dialog: MatDialog) { }

    openDialog(salle?): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        hasBackdrop:false,
        data: {salleToDelete: salle}

      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  ngOnInit(): void {

    this.authService.whoIsConnected().then((resolve:string)=>{
      this.signedUserEmail = resolve;
      console.log(resolve);
      //console.log(key);
  })


  this.adminProprioG.isAdmin().then((resolve)=>{
    if(resolve==false){
      this.retrieveSallesForUser();
    }else{
      this.retrieveSalles();
    }
});



   // this.retrieveSallesForUser();
  }


  refreshList(): void {
    this.currentSalle = null;
    this.currentIndex = -1;
    this.retrieveSalles();
  }

  retrieveSalles(): void {
    this.sallesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.salles = data;
    });
  }

  retrieveSallesForUser(): void {
    let lesSalles;
    this.sallesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
 

      data.forEach(oneData => {
        if(oneData.proprio.email==this.signedUserEmail){
          this.salles.push(oneData);
        }
      });


    });
  }

  setActiveSalle(salle, index): void {
    this.currentSalle = salle;
    this.currentIndex = index;
  }

  removeAllSalles(): void {
    this.sallesService.deleteAll()
      .then()
      .catch(err => console.log(err));
  }

  onUpdate(key) {
    this.router.navigate(['/salles', 'edit', key]);
  }





  /*
    deleteSalle(): void {
      this.sallesService.delete(this.currentTutorial.key)
        .then(() => {
          //this.refreshList.emit();
          //this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  
  
  */














  verifySalleOwner(salle: Salle) {
    console.log(this.sallesService.isSalleForMe(salle));
    return this.sallesService.isSalleForMe(salle);

  }

  chargementPourLesProprietaires() {
    this.sallesService.getSallesForAProprio(this.signedUserEmail);
    this.sallesService.emitSalles();
  }

  chargementPourLesAdmins() {
    this.sallesService.getSalles();
    // this.sallesService.emitSalles();
  }

  onNewSalle() {
    this.router.navigate(['/salles', 'new']);
  }


  onViewSalle(id) {
    this.router.navigate(['/salles', 'view', id]);
  }

  ngOnDestroy() {
    this.salleSubscriber.unsubscribe();
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl:'./modalSuppression.component.html'
})
export class DialogOverviewExampleDialog {


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private sallesService: SallesService,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteSalle(key) {
    this.sallesService.delete(key).then(()=>{
      this.dialogRef.close();
    });

  }


}