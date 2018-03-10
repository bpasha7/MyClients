
import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client } from '../../models/index';
import { ClientService } from '../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'clients',
    styleUrls: ['./clients.component.css'],
    templateUrl: './clients.component.html',
})

export class ClientsComponent {
    displayedColumns = ['lastName', 'contacts'];
    dataSource: MatTableDataSource<Client> = null;
    clients: Client[] = [];
   // resultsLength: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private http: Http, public dialog: MatDialog, private clientService: ClientService) {
        clientService.get().subscribe(
            data => {
                this.clients = data.json().clients;
                // this.resultsLength = this.clients.length;
                this.dataSource = new MatTableDataSource(this.clients);
                this.ngAfterViewInit();
            },
            error => {
                console.error(error._body);
            }
        );
    }

    /**
 * Set the paginator and sort after the view init since this component will
 * be able to query its view for the initialized paginator and sort.
 */
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
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
        const dialogRef = this.dialog.open(ClientModalComponent, {
            minWidth: '95vw',
            // data: {client: this.client }
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     if(result == 1)
        //     this.create();
        // })
    }

    /* test(){
         this.http.get('http://localhost:4201/api/values').subscribe(
             data => {
                 var res = data.json().message
             }
     );
     }*/
}
