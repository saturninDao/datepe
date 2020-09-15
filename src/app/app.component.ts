import { Component } from '@angular/core';
import { MyConfig } from './config/config';
import * as firebase from 'firebase';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datepe';
  constructor(
    private myconfig:MyConfig,
    private router:Router
    ){
      const config = myconfig.getConfig();
      firebase.initializeApp(config);
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd )) {
            return;
        }
        window.scrollTo(0, 0)
    });
}
}
