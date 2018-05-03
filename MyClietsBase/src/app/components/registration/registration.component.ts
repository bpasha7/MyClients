import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { User } from '../../models';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { UserService } from '../../services';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  userInfoFormGroup: FormGroup;
  accountInfoFormGroup: FormGroup;
  newUser: User;
  password = '';
  constructor(private _formBuilder: FormBuilder,
  private userService: UserService,
  public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newUser = new User();
    this.newUser.birthday = new Date(1990, 0, 1);
    this.userInfoFormGroup = this._formBuilder.group({
      userInfoCtrl: ['', Validators.required]
    });
    this.accountInfoFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required, this.password === this.newUser.password],
      loginCtrl: ['', Validators.required]
    });
  }

  register() {
    this.userService.register(this.newUser).subscribe(
      data => {
        this.snackBar.open(data.json().message, 'Закрыть', {
          duration: 2000,
        });
        setTimeout(() => {
          this.userService.goLogin();
      }, 2500);
      },
      error => {
          this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
          });
      }
    );
  }
}
