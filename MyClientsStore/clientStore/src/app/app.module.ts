import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppConfig } from './app.config';
/*Routes */
const appRoutes: Routes = [
  { path: ':name', component: StoreComponent },

];
/*Routes */

// import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatToolbarModule,
  MatGridListModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
  MatTabHeader
} from '@angular/material';
import { PreviewComponent } from './components/modal/preview/preview.component';
import { StoreComponent } from './components/store/store.component';
@NgModule({
  exports: [
    CdkTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    
  ],
  declarations: []
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    PreviewComponent
  ],
  entryComponents: [
    PreviewComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule,
  ],
  providers: [
    AppConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
