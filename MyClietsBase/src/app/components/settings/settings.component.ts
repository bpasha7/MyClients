import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TooltipPosition } from '@angular/material';
import { User, Bonus, BonusType, Store } from '../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OutgoingModalComponent, ConfirmationComponent } from '../modals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public user: User;
  public store: Store;
  public password = '';
  public confirmPassword = '';
  public bonusHistory: Array<Bonus> = [];
  public bonusType: Array<BonusType> = [];
  public inProgress = false;
  passwordChangeGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.user = new User();
    this.store = new Store();
  }

  ngOnInit() {
    this.loadUserInfo();
    this.userService.notifyMenu('Настройки');
    this.passwordChangeGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required]
    });
  }

  loadUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.user = data.json().user;
        this.store = data.json().store;
      },
      error => {
        this.userService.responseErrorHandle(error);
      }
    );
  }

  loadBonusHistory(skip: number) {
    if( skip === 0 ) {
      this.bonusType = [];
      this.bonusHistory = [];
    }
    this.inProgress = true;
    this.userService.getBonusHistory(skip).subscribe(
      data => {
        if( skip === 0 ) {
          this.bonusType = data.json().types;
          this.bonusHistory = data.json().history;
        } else {
          this.bonusHistory = this.bonusHistory.concat(data.json().history);
        }  
        this.inProgress = false;
      },
      error => {
        this.userService.responseErrorHandle(error);
        this.inProgress = false;        
      }
    );
  }

  getBonusName(id: number):string {
    return this.bonusType.find(item => item.id === id).name;  
  }

  prolongStore(){
    this.userService.prolongStorePeriod(this.store.id).subscribe(
      data => {
        this.store.activationEnd = data.json().Date;
        this.store.isActive = true;
      },
      error => {
        this.userService.responseErrorHandle(error);   
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
