import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Outgoing } from '../../models/index';
import { UserService } from '../../services/index';
import { OutgoingModalComponent, ConfirmationComponent } from '../modals';

@Component({
  selector: 'app-outgoings',
  templateUrl: './outgoings.component.html',
  styleUrls: ['./outgoings.component.css']
})
export class OutgoingsComponent implements OnInit {
  public end: Date = new Date();
  public begin: Date = new Date(this.end.getFullYear(), this.end.getMonth(), 1);
  public outgoings: Outgoing[] = [];
  public sum = 0;
  public process = false;
  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.process = true;
    this.userService.notifyMenu('Расходы');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.loadOutgoings();
  }
  /**
   * Load outgoings
   */
  loadOutgoings() {
    this.userService.getOutgoings(this.begin, this.end).subscribe(
      data => {
        this.outgoings = data.json().outgoings;
        this.outgoingsSum();
        this.process = false;
      },
      error => {
        this.userService.responseErrorHandle(error);
      }
    );
  }
  /**
   * Sort outgoings
   */
  sort() {
    this.outgoings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.outgoingsSum();
  }
  /**
   * Outgoings sum
   */
  outgoingsSum() {
    this.sum = 0;
    this.outgoings.forEach(outgoing => {
      this.sum += +outgoing.total;
    });
  }
  /**
   * Delete outgoing
   * @param outgoing
   */
  delete(outgoing: Outgoing) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
       data: {
         title: 'Подтвердите',
         text: 'Удалить ' + outgoing.name + ' на сумму ' + outgoing.total  + '?',
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.userService.deleteOutgoing(outgoing.id).subscribe(
          data => {
            const index: number = this.outgoings.indexOf(outgoing);
            if (index !== -1) {
              this.outgoings.splice(index, 1);
            }
            this.outgoingsSum();
            this.snackBar.open(data.json().message, 'Закрыть', {
              duration: 2000,
            });
          },
          error => {
            this.userService.responseErrorHandle(error);
          }
        );
      }
    });
  }
  /**
   * Open new outgoing dialog
   */
  openDialog() {
    const dialogRef = this.dialog.open(OutgoingModalComponent, {
      maxWidth: '310px',
      width: 'auto',
      // data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.id !== 0) {
        this.outgoings.push(result);
        this.sort();
      }
    });
  }
  /**
   * Open outgoing dialog for editing data
   * @param user outgoing
   */
  openEditOutgoingDialog(outgoing: Outgoing) {
    const temp = Object.assign({}, outgoing);
    const dialogRef = this.dialog.open(OutgoingModalComponent, {
      maxWidth: '310px',
      width: 'auto',
      data: {
        outgoing: temp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const pos = this.outgoings.findIndex(item => item.id === temp.id);
        if (pos !== -1) {
            this.outgoings.splice(pos, 1);
            this.outgoings.push(temp);
        }
        this.sort();
      }
    });
  }
}
