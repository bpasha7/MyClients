import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TooltipPosition } from '@angular/material';
import { User, Bonus, BonusType, Store } from '../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  OutgoingModalComponent,
  ConfirmationComponent,
  PhotoModalComponent
} from '../modals';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  photoDir: string;
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
    public dialog: MatDialog,
    private config: AppConfig
  ) {
    this.user = new User();
    this.store = new Store();
    this.photoDir = this.config.photoUrl + localStorage.getItem('userHash') + '/';
  }

  ngOnInit() {
    this.loadUserInfo();
    this.userService.notifyMenu('Настройки');
    this.passwordChangeGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required]
    });
  }
  /**
   * Load user and store info
   */
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
  /**
   * Load bonus history
   * @param skip number positions to skip
   */
  loadBonusHistory(skip: number) {
    if (this.inProgress === true) {
      return;
    }
    if (skip === 0) {
      this.bonusType = [];
      this.bonusHistory = [];
    }
    this.inProgress = true;
    this.userService.getBonusHistory(skip).subscribe(
      data => {
        if (skip === 0) {
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
  /**
   * Get bonus type name by id
   * @param id Bonus type id
   */
  getBonusName(id: number): string {
    return this.bonusType.find(item => item.id === id).name;
  }
  /**
   * Prolong user store
   */
  prolongStore() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Подтвердите',
        text: 'Продлить личный магазин на 10 дней за 30 бонусов?',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.inProgress = true;
        this.userService.prolongStorePeriod(this.store.id).subscribe(
          data => {
            const jdata = data.json();
            this.store.activationEnd = jdata.date;
            this.user.bonusBalance = jdata.balance;
            this.store.isActive = true;
            this.inProgress = false;
            this.userService.showSnackBar('Продлено!');
          },
          error => {
            this.userService.responseErrorHandle(error);
            this.inProgress = false;
          }
        );
      }
    });
  }
  /**
   * Open dialog for uploading new product photo
   */
  openPhotoDialog() {
    const dialogRef = this.dialog.open(PhotoModalComponent, {
      data: {
        type: 'user'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        this.user.hasPhoto = true;
      }
    });
  }
  /**
   * Generate url for user photo
   */
  generateAvatarUrl(): string {
    const url = this.user.hasPhoto ? this.photoDir + 'me.jpg' : this.config.defaultAvatar;
    return 'url(' + url + ')';
  }
  updateStoreInfo() {
    this.userService.updateStoreInfo(this.store).subscribe(
      data => {
        this.userService.showSnackBar('Информация обновлена!');
      },
      error => {
        this.userService.responseErrorHandle(error);
        // this.inProgress = false;
      }
    );
  }
  /**
   * Edit user password
   */
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
