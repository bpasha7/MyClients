import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { PreviewComponent } from 'src/app/components/modal/preview/preview.component';
import { AppConfig } from '../../app.config';
import { MessageComponent } from '../modal/message/message.component';
import { Store } from '../../models/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public photoPath = '';
  public avatar = '';
  public store: Store;
  constructor(
    public previewDialog: MatDialog,
    private _storeService: StoreService,
    private route: ActivatedRoute,
    private config: AppConfig
  ) {
    this.store = new Store();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadStore(params['name']);
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }
  loadStore(name: string) {
    this._storeService.getStore(name).subscribe(
      data => {
        const jData = data.json();
        this.store = jData.store;
        this.photoPath = this.config.photoUrl + jData.hash + '/';
        this.avatar = 'url(' + this.photoPath + 'me.jpg)';
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
        text: product.description,
        price: product.price,
        title: product.name,
        src: this.getUrl(product.id) // this.photoPath + product.id + '_p.jpg'
      }
    });
  }

  showMessageForm() {
    const dialogRef = this.previewDialog.open(MessageComponent, {
      maxWidth: '410px',
      width: 'auto',
      data: {
        storeName: this.store.name
      }
    });
  }
}
