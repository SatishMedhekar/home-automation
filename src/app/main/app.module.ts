import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavigation } from '../pages/navigation/header/header-navigation.component';
import { LeftNavigation } from '../pages/navigation/left/left-navigation.component';
import { RightNavigation } from '../pages/navigation/right/right-navigation.component';
import { HomeComponent } from '../pages/home/home.component';
import { CalenderComponent } from '../pages/calender/calender.component';
import { WeatherComponent } from '../pages/weather/weather.component';
import { WeatherDetailComponent } from '../pages/weather/weatherdetail.component';
import { LightMainComponent } from '../pages/lightcontrol/light-main/light-main.component';
import { LightswitchComponent } from '../pages/lightcontrol/light-switch/light-switch.component';
import { LightdimmerComponent } from '../pages/lightcontrol/light-dimmer/light-dimmer.component';
import { Firstfloorzone1Component } from '../pages/lightcontrol/first-floor-zone1/first-floor-zone1.component';
import { ConvertToDegree } from '../pipe/convert-to-degree.pipe';

import { WeatherService } from '../pages/weather/service/weather.service';
import { AuthService } from '../service/authservice';

import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JQ_TOKEN, CommonFunction } from '../service/index';

import { from } from 'rxjs';
import { MenuService } from '../pages/navigation/service/menu.service';

let jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    ConvertToDegree,
    HeaderNavigation,
    LeftNavigation,
    RightNavigation,
    HomeComponent,
    WeatherComponent,
    WeatherDetailComponent,
    CalenderComponent,
    LightMainComponent,
    LightswitchComponent,
    LightdimmerComponent,
    Firstfloorzone1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [
    CommonFunction, WeatherService, AuthService, MenuService,
    { provide: JQ_TOKEN, useValue: jQuery }],
  bootstrap: [AppComponent]
})
export class AppModule { }
