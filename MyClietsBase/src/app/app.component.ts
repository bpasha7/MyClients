import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserService, ClientService } from './services';
import { MatIconRegistry, NativeDateAdapter, MatSnackBar } from '@angular/material';
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
  public isLogined = false;
  public unreadMessageCount = 0;
  title = this.appName;
  public constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
    private clientService: ClientService,
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconReg
      .addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'))
      .addSvgIcon('pay', sanitizer.bypassSecurityTrustResourceUrl('/assets/pay.svg'))
      .addSvgIcon('percentage', sanitizer.bypassSecurityTrustResourceUrl('/assets/percentage.svg'));

    const user = localStorage.getItem('currentUser');
    this.isLogined = user ? true : false;
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.handleMessage(message));
    this.clientService.currentMessage.subscribe(message => this.handleMessage(message));
    this.checkMessages();
  }

  checkMessages() {
    this.userService.getUnreadCount().subscribe(
      data => {
        this.unreadMessageCount = data.json().unread;
      });
  }

  handleMessage(message: any) {
    if (message.type !== undefined) {
      this.snackBar.open(message.text, 'Закрыть', {
        duration: 2000,
      });
    } else {
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
  }

  // setTitel(section: string){
  //   this.title = this.appName + this.separator + section;
  // }
}

export class MyDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}
