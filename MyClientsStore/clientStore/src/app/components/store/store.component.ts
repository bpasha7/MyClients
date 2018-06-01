import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { PreviewComponent } from 'src/app/components/modal/preview/preview.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public hash = '';
  public products: Array<Product> = [];
  constructor(
    public previewDialog: MatDialog,
    private _storeService: StoreService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
}
// tslint:disable-next-line:use-life-cycle-interface
ngAfterViewInit() {
    this.route.params.subscribe(params => {
        this.loadStore(params['name']);
    });

}
  loadStore(name: string) {
    this._storeService.getStore(name).subscribe(
      data => {
        const jData = data.json();
        this.products = jData.products;
        this.hash =jData.hash;
          // this.client = data.json().client;
          // this.orders = data.json().orders;
          // this.filterOrders();
          // // concat photo url
          // this.photo = this.config.photoUrl + localStorage.getItem('userHash') + '/' + this.client.id + '.jpg';
      },
      error => {
          //this.userService.responseErrorHandle(error);
      }
  );
  }

  showInfo() {
    const dialogRef = this.previewDialog.open(PreviewComponent, {
      maxWidth: '410px',
      width: 'auto',
      //height: 'auto',
      maxHeight: '650px',
      data: {
          text: 'Product description',
          title: 'Product Name',
          src: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
      }
  });

}
}
