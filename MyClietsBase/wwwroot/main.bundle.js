webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".my-header{\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n.my-footer{\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n.my-container{\r\n    position: absolute;\r\n    top: 60px;\r\n    bottom: 60px;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n.my-sidenav{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    width: 150px;\r\n}\r\n.my-list-menu{\r\n    height: 98%;\r\n    width: 100%;\r\n    padding-top: 2%;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"my-header\">\n  <button mat-icon-button (click)=\"sidenav.toggle()\">\n    <mat-icon>menu</mat-icon>\n  </button>\n  <h1>My Clients</h1>\n</mat-toolbar>\n\n<mat-sidenav-container class=\"my-container\">\n\n  <mat-sidenav #sidenav mode=\"side\" opened=\"false\" color=\"grey\" class=\"my-sidenav\" [fixedInViewport]=\"false\">\n    <mat-nav-list class=\"my-list-menu\">\n      <h3 mat-subheader>Меню</h3>\n      <a mat-list-item routerLink=\".\">\n        <mat-icon mat-list-icon>people</mat-icon>\n        Клиенты\n      </a>\n      <mat-divider></mat-divider>\n      <h3 mat-subheader>Управление</h3>\n      <a mat-list-item routerLink=\".\">\n        <mat-icon mat-list-icon>settings</mat-icon>\n        Настрйоки\n      </a>\n    </mat-nav-list>\n  </mat-sidenav>\n\n  <mat-sidenav-content>\n\n  </mat-sidenav-content>\n\n</mat-sidenav-container>\n\n<mat-toolbar class=\"my-footer\">bezruk-ognerubova@2018</mat-toolbar>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DemoMaterialModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_cdk_table__ = __webpack_require__("./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DemoMaterialModule = /** @class */ (function () {
    function DemoMaterialModule() {
    }
    DemoMaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["H" /* NgModule */])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatDividerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["s" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["y" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["x" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["A" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["D" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["F" /* MatTooltipModule */],
            ]
        })
    ], DemoMaterialModule);
    return DemoMaterialModule;
}());

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["H" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                DemoMaterialModule,
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* ReactiveFormsModule */],
            ],
            entryComponents: [],
            declarations: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map