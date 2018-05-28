import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TooltipPosition } from '@angular/material';
import { User } from '../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OutgoingModalComponent, ConfirmationComponent } from '../modals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public user: User;
  public password = '';
  public confirmPassword = '';
  passwordChangeGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.loadUserInfo();
    this.passwordChangeGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required]
    });
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

  editPassword() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Подтвердите',
        text: 'Изменить пароль?',
       }
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result === 1) {
       this.userService.editPassword(this.password).subscribe(
         data => {
          this.userService.showSnackBar('Пароль изменен, перезайдите!');
          setTimeout(() => {
            this.userService.goLogin();
        }, 2500);
         },
         error => {
           this.userService.responseErrorHandle(error);
         }
       );
     }
   });
  }

}
