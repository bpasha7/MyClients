import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injectable, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
registerLocaleData(localeRu, localeRuExtra);
import { CustomPaginator } from './components/customPaginator';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  MatChipsModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
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
  MAT_CHIPS_DEFAULT_OPTIONS,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { ChartsModule } from 'ng2-charts-x';
/**
 * UI components
 */
import { AppComponent, MyDateAdapter } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import {
  ClientModalComponent,
  ProductModalComponent,
  OrderModalComponent,
  PhotoModalComponent,
  OutgoingModalComponent,
  DiscountModalComponent,
  MessagePreviewComponent,
  ConfirmationComponent,
} from './components/modals/index';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OutgoingsComponent } from './components/outgoings/outgoings.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegistrationComponent } from './components/registration/registration.component';


import { AppConfig } from './app.config';
import { UserService, ClientService } from './services/index';
import { BusyComponent } from './components/busy/busy.component';
import { from } from 'rxjs';
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
  { path: '', component: OrdersComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'start', component: RegistrationComponent },

];
/*Routes */

@NgModule({
  exports: [
    CdkTableModule,
    MatChipsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
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
    ChartsModule,
  ],
  entryComponents: [
    ClientModalComponent,
    ProductModalComponent,
    OrderModalComponent,
    PhotoModalComponent,
    DiscountModalComponent,
    OutgoingModalComponent,
    MessagePreviewComponent,
    ConfirmationComponent,
    BusyComponent
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
    MessagePreviewComponent,
    ConfirmationComponent,
    OutgoingModalComponent,
    ProductsComponent,
    MessagesComponent,
    RegistrationComponent,
    OrdersComponent,
    OutgoingsComponent,
    LoginComponent,
    SettingsComponent,
    AnalyticsComponent,
    BusyComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter},
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    // { provide: MAT_CHIPS_DEFAULT_OPTIONS,
    //   useValue: {
    //     separatorKeyCodes: [ENTER, COMMA]
    //   }
    // },
    AppConfig,
    ClientService,
    UserService
  ]
})
export class AppModule { }
