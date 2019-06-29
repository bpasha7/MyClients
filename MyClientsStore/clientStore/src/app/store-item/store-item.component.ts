import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {
  @Input() host: string;
  @Input() product: Product;
  @Output() public onAddToChart: EventEmitter<Product> = new EventEmitter();
  public showDescription = false;
  constructor() { }

  
  ngOnInit() {
  }

  addProductToChart() {
    this.onAddToChart.emit(this.product);
  }

  getUrl(id: number): string {
    return `url(${this.host}${id}_p.jpg)`;
  }

}
