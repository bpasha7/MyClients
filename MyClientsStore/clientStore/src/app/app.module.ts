import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';

// import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatToolbarModule,
  MatGridListModule,
  MatDialogModule
} from '@angular/material';
import { PreviewComponent } from './components/modal/preview/preview.component';
@NgModule({
  exports: [
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatDialogModule
  ],
  declarations: []
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent
  ],
  entryComponents: [
    PreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
