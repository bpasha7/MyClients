import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.css']
})
export class BusyComponent implements OnInit, OnDestroy {

  @Input() status: boolean;
  constructor() { }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.status = false;
  }

}
