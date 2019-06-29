import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppConfig } from './app.config';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
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
  MatTabHeader,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule
} from '@angular/material';

import { PreviewComponent } from './components/modal/preview/preview.component';
import { StoreComponent } from './components/store/store.component';
import { MessageComponent } from './components/modal/message/message.component';
import { StoreItemComponent } from './store-item/store-item.component';

@NgModule({
  exports: [
    CdkTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    PreviewComponent,
    MessageComponent,
    StoreItemComponent
  ],
  entryComponents: [
    PreviewComponent,
    MessageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    AppConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
