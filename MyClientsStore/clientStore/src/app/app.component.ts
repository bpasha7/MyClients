import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PreviewComponent } from './components/modal/preview/preview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //h eight = window.screen.width / 10;
  tiles = [
    {cols: 1, rows: 1, color: 'lightblue'},
    {cols: 1, rows: 1, color: 'lightgreen'},
    {cols: 1, rows: 1, color: 'lightpink'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  constructor(
    public previewDialog: MatDialog,
  ) { }

  showInfo() {
    const dialogRef = this.previewDialog.open(PreviewComponent, {
     // maxWidth: '310px',
      width: 'auto',
      height: 'auto',
      data: {
          text: 'Product description',
          title: 'Product Name',
          src: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
      }
  });
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   event.target.innerWidth;
  //   this.height = window.screen.width / 25;
  // }
}
