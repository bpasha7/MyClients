import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  appName = 'My Clients';
  separator = ' :: ';
  public isLogined:boolean = false;
  title = this.appName;
  public constructor(
    private userService: UserService,
   ) {
    const user = localStorage.getItem('currentUser');
    this.isLogined = user ? true : false;
   }

   ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.handleMessage(message));
    // this.userRoleId = JSON.parse(localStorage.getItem('currentUser')).roleId;
  }

  handleMessage (message: string) {
    switch (message) {
      case '1':
        this.isLogined = true;
        break;
      case '0':
        this.isLogined = false;
        break;
    }
  }

  // setTitel(section: string){
  //   this.title = this.appName + this.separator + section;
  // }
}
