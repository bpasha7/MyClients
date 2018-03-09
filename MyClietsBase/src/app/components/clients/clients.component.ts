
import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client } from '../../models/index';
import { ClientService } from '../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
@Component({
    selector: 'clients',
    styleUrls: ['./clients.component.css'],
    templateUrl: './clients.component.html',
})

export class ClientsComponent {
    displayedColumns = ['id', 'name', 'phone', 'link'];
    dataSource: MatTableDataSource<Client> = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    //private client: Client;
    constructor(private http: Http, public dialog: MatDialog, private clientService: ClientService) {
        clientService.get().subscribe(
            data => {
                const clients: Client[] = data.json().clients;
                this.dataSource = new MatTableDataSource(clients);
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
