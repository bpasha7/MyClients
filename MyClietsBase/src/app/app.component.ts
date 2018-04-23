import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { UserService, ClientService } from './services';
import { MatIconRegistry } from '@angular/material';
//import { Client } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  appName = 'My Clients';
  separator = ' :: ';
  public isLogined: boolean = false;
  title = this.appName;
  public constructor(
    private userService: UserService,
    private clientService: ClientService,
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconReg
      .addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'));
    const user = localStorage.getItem('currentUser');
    this.isLogined = user ? true : false;
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.handleMessage(message));
    this.clientService.currentMessage.subscribe(message => this.handleMessage(message));
    // this.userRoleId = JSON.parse(localStorage.getItem('currentUser')).roleId;
  }

  handleMessage(message: string) {
    switch (message) {
      case '1':
        this.isLogined = true;
        break;
      case '0':
        this.isLogined = false;
        break;
      default:
        this.title = message;
        break;
    }
  }

  // setTitel(section: string){
  //   this.title = this.appName + this.separator + section;
  // }
}
