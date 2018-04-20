import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injectable, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomPaginator } from './components/customPaginator';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorIntl,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { ChartsModule } from 'ng2-charts-x';
/**
 * UI components
 */
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import {
  ClientModalComponent,
  ProductModalComponent,
  OrderModalComponent,
  PhotoModalComponent,
  OutgoingModalComponent,
  DiscountModalComponent
} from './components/modals/index';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OutgoingsComponent } from './components/outgoings/outgoings.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';

import { AppConfig } from './app.config';
import { UserService, ClientService } from './services/index';
/*Routes */
const appRoutes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'outgoings', component: OutgoingsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '', component: MessagesComponent },
  { path: 'messages', component: MessagesComponent },
];
/*Routes */

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class DemoMaterialModule { }

/*const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return '0 из ${length}'; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
};
@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  itemsPerPageLabel = 'Всего';
  getRangeLabel = spanishRangeLabel;
}*/

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatTableModule,
    MatSortModule,
    ChartsModule
  ],
  entryComponents: [
    ClientModalComponent,
    ProductModalComponent,
    OrderModalComponent,
    PhotoModalComponent,
    DiscountModalComponent,
    OutgoingModalComponent
  ],
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientComponent,
    ClientModalComponent,
    ProductModalComponent,
    OrderModalComponent,
    PhotoModalComponent,
    DiscountModalComponent,
    OutgoingModalComponent,
    ProductsComponent,
    MessagesComponent,
    OrdersComponent,
    OutgoingsComponent,
    LoginComponent,
    SettingsComponent,
    AnalyticsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    AppConfig, ClientService, UserService]
})
export class AppModule { }
