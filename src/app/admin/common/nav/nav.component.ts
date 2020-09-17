import { Component, OnInit } from '@angular/core';
import { AdminProprioGuardService } from 'src/app/services/admin-proprio-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  isAdmin: boolean;
  constructor(private authService: AuthService,private adminProprioGuard:AdminProprioGuardService) { }

  ngOnInit(): void {
    this.adminProprioGuard.isAdmin().then(
      (resolve:boolean)=>{
        this.isAdmin = resolve;
        console.log(this.isAdmin);
      }
    )
  }



  signOut(){
    this.authService.signOut();
  }

}
