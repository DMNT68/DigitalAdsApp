import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AboutComponent } from './about.component';

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);


const routes: Routes = [
  {path: '', component:AboutComponent}
]

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AboutModule { }
