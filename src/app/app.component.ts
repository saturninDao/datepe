import { Component } from '@angular/core';
import { MyConfig } from './config/config';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datepe';
  constructor(private myconfig:MyConfig){
      const config = myconfig.getConfig();
      firebase.initializeApp(config);
  }
}
