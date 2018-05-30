import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';

import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatCardModule,
  MatButtonModule
  //MatGridListModule
} from '@angular/material';
@NgModule({
  exports: [
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
  ],
  declarations: []
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
