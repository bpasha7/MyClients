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
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadOutgoings();
  }

  loadOutgoings() {
    this.userService.getOutgoings(this.begin, this.end).subscribe(
      data => {
        this.outgoings = data.json().outgoings;
      },
      error => {
        // this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
        //     duration: 2000,
        //});
      }
    );
  }

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
