import { Component, OnInit } from '@angular/core';
import { User } from '../../models/index';
import { UserService } from '../../services/index';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  /**
   * Flag for shoing progress bar
   */
  public loading = false;
  /**
   * Url for redirecting after succes logining
   */
  private returnUrl = '/orders';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.logout();
  }

  login() {
    this.loading = true;
    this.userService.login(this.user).subscribe(
      data => {
        const user = data.json();
        if (user && user.token) {
          this.userService.setToken(user.token, user.hash);
          this.router.navigate([this.returnUrl]);
        }
      },
      error => {
        this.loading = false;
        this.userService.responseErrorHandle(error);
      }
    );
  }

}
