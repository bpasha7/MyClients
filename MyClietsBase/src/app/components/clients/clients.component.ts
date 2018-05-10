import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client } from '../../models/index';
import { ClientService } from '../../services/index';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'clients',
    styleUrls: ['./clients.component.css'],
    templateUrl: './clients.component.html',
})

export class ClientsComponent implements OnInit {
    displayedColumns = ['lastName', 'contacts'];
    dataSource: MatTableDataSource<Client> = null;
    clients: Client[] = [];
    newClient: Client;
    // resultsLength: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private clientService: ClientService) {
    }

    ngOnInit() {
        this.loadClients();
        this.clientService.notifyMenu('Клиенты');
    }

    loadClients() {
        this.clientService.getAll().subscribe(
            data => {
                this.clients = data.json().clients;
                this.initDataSource();
            },
            error => {
                this.clientService.responseErrorHandle(error);
            }
        );
    }

    /**
 * Set the paginator and sort after the view init since this component will
 * be able to query its view for the initialized paginator and sort.
 */
    // tslint:disable-next-line:use-life-cycle-interface
    initDataSource() {
        this.dataSource = new MatTableDataSource(this.clients);
        if (this.dataSource != null) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    openDialog(): void {
        this.newClient = new Client();
        this.newClient.lastName = '';
        this.newClient.id = 0;
        this.newClient.birthday = new Date(1990, 0, 1);
        const dialogRef = this.dialog.open(ClientModalComponent, {
            maxWidth: '310px',
            width: 'auto',
            data: {
                client: this.newClient,
            }
        });
        // Test return value
        dialogRef.afterClosed().subscribe(result => {
            if (this.newClient.id !== 0) {
                this.clients.push(result);
                this.initDataSource();
            }
        });
    }

    /* test(){
         this.http.get('http://localhost:4201/api/values').subscribe(
             data => {
                 var res = data.json().message
             }
     );
     }*/
}
