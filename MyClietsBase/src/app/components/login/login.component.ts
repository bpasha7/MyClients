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
  private loading = false;
  /**
   * Url for redirecting after succes logining
   */
  private returnUrl = '/clients';

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
          this.userService.setToken(user.token);
          this.router.navigate([this.returnUrl]);
        }
      },
      error => {
        this.loading = false;
        this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
        });
      }
    );
  }

}
