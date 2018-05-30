import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  height = window.screen.width / 10;
  tiles = [
    {cols: 1, rows: 1, color: 'lightblue'},
    {cols: 1, rows: 1, color: 'lightgreen'},
    {cols: 1, rows: 1, color: 'lightpink'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
    {cols: 1, rows: 1, color: '#DDBDF1'},
  ];


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.height = window.screen.width / 25;
  }
}
