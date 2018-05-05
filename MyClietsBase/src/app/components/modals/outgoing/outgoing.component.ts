import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Outgoing } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'outgoing-dialog',
    styleUrls: ['./outgoing.component.css'],
    templateUrl: './outgoing.component.html',
})

export class OutgoingModalComponent {
    public outgoing: Outgoing;
    public title: string;
    public inProc = false;
    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<OutgoingModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data == null) {
                this.outgoing = new Outgoing();
                this.outgoing.id = 0;
                this.outgoing.date = new Date();
                this.title = 'Новый расход';
            } else {
                this.outgoing = data.outgoing;
                this.title = 'Обновление';
            }
    }

    create() {
        this.inProc = true;
        this.userService.createOutgoing(this.outgoing).subscribe(
            data => {
                this.outgoing.id = data.json().outgoingId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(this.outgoing);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }

    update() {
        this.inProc = true;
        this.userService.updateOutgoing(this.outgoing).subscribe(
            data => {
                this.dialogRef.close(1);
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                  });
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                // this.dialogRef.close(0);
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}
