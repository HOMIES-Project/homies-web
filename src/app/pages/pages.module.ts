import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    SharedComponentsModule,
  ],
})
export class PagesModule {}
