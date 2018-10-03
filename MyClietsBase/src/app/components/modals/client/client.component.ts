import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client, Order } from '../../../models/index';
import { ClientService } from '../../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
import { error } from 'util';
import { FormGroup, Validators, FormControl, FormBuilder, NgForm } from '@angular/forms';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client-dialog',
    styleUrls: ['./client.component.css'],
    templateUrl: './client.component.html',
})

export class ClientModalComponent implements OnInit {
    public client: Client;
    public inProc = false;
    public clientFormGroup: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<ClientModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.client = data.client;
    }
    ngOnInit() {
        this.clientFormGroup = this._formBuilder.group({
            'lastName': new FormControl(this.client.lastName, [
              Validators.required,
            ]),
            'firstName': new FormControl(this.client.firstName, [
                Validators.required,
            ]),
          });
    }

    onSubmit() {
        if (this.clientFormGroup.invalid) {
            return;
        }
        if ( this.client.id > 0 ) {
            this.update();
        } else if (this.client.id === 0 ) {
            this.create();
        } else {
            return;
        }
    }

    create() {
        this.inProc = true;
        this.clientService.create(this.client).subscribe(
            data => {
                this.client.id = data.json().clientId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(this.client);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.clientService.responseErrorHandle(error);
            }
        );
    }

    update() {
        // this.client.birthday = new Date(this.client.birthday);
        // const offset = this.client.birthday.getTimezoneOffset();
        // if (offset) {
        //     this.client.birthday.setHours(-offset / 60);
        // }

        this.inProc = true;
        this.clientService.update(this.client).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.clientService.responseErrorHandle(error);
            }
        );
    }


    onNoClick(): void {
        this.dialogRef.close(this.client);
        // this.dialogRef.close();
    }
}
