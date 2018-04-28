import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Outgoing } from '../../models/index';
import { UserService } from '../../services/index';
import { OutgoingModalComponent } from '../modals';

@Component({
  selector: 'app-outgoings',
  templateUrl: './outgoings.component.html',
  styleUrls: ['./outgoings.component.css']
})
export class OutgoingsComponent implements OnInit {
  public end: Date = new Date();
  public begin: Date = new Date(this.end.getFullYear(), this.end.getMonth(), 1);
  public outgoings: Outgoing[] = [];
  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadOutgoings();
    this.userService.notifyMenu("Расходы");
  }
  /**
   * Load outgoings
   */
  loadOutgoings() {
    this.userService.getOutgoings(this.begin, this.end).subscribe(
      data => {
        this.outgoings = data.json().outgoings;
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
  /**
   * Outgoings sum
   */
  sum() {
    let count: number = 0;
    this.outgoings.forEach(outgoing => {
        count+=outgoing.total;
    });
    return count;
  }
  /**
   * Delete outgoing
   * @param outgoing
   */
  delete(outgoing: Outgoing) {
    const index: number = this.outgoings.indexOf(outgoing);
    if (index !== -1) {
        this.outgoings.splice(index, 1);
    }  
  }
  /**
   * Open new outgoing dialog
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(OutgoingModalComponent, {
      // data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.id !== 0) {
        // this.clients.push(result);
        // this.initDataSource();
      }

    })
  }
}
