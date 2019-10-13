import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent }

]

@NgModule({
imports: [NativeScriptRouterModule, NativeScriptRouterModule.forChild(routes)],
exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule { }