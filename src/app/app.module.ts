import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

import { FormsModule } from '@angular/forms'; // For ngModel
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,   // For the toolbar
    MatButtonModule,    // For buttons
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
