import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { PreviewComponent } from 'src/app/components/modal/preview/preview.component';
import { AppConfig } from '../../app.config';
import { MessageComponent } from '../modal/message/message.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public photoPath = '';
  public products: Array<Product> = [];
  constructor(
    public previewDialog: MatDialog,
    private _storeService: StoreService,
    private route: ActivatedRoute,
    private config: AppConfig
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
        this.photoPath = this.config.photoUrl + jData.hash + '/';
        // this.photo = this.config.photoUrl + localStorage.getItem('userHash') + '/' + this.client.id + '.jpg';
      },
      error => {
        // this.userService.responseErrorHandle(error);
      }
    );
  }

  getUrl(id: number): string {
    return 'url(' + this.photoPath + id + '_p.jpg)';
  }

  showInfo(product: Product) {
    const dialogRef = this.previewDialog.open(PreviewComponent, {
      maxWidth: '410px',
      width: 'auto',
      // height: 'auto',
      maxHeight: '650px',
      data: {
        text: product.price,
        title: product.name,
        src: this.getUrl(product.id) // this.photoPath + product.id + '_p.jpg'
      }
    });
  }

  showMessageForm() {
    const dialogRef = this.previewDialog.open(MessageComponent, {
      maxWidth: '410px',
      width: 'auto'
    });
  }
}
