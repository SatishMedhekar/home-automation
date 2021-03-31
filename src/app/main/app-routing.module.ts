import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { WeatherDetailComponent } from '../pages/weather/weatherdetail.component';
import { LightMainComponent } from '../pages/lightcontrol/light-main/light-main.component';
import { LightswitchComponent } from '../pages/lightcontrol/light-switch/light-switch.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'weatherdetail', component: WeatherDetailComponent },
  { path: 'lightcontrol', component: LightMainComponent },
  { path: 'lightswitch', component: LightswitchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
