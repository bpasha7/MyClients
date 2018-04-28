import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public user: User;
  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.user = data.json().user;
      },
      error => {
        if (error.status === 401) {
          this.userService.goLogin();
          this.snackBar.open('Пароль истек!', 'Закрыть', {
            duration: 2000,
          });
        }
        else {
          this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
          });
        }
      }
    );
  }

}
