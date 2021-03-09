import { Component } from '@angular/core';
import { IWeeklyWeather } from 'src/app/interfaces/iweather';
import { WeatherService } from './service/weather.service';

@Component({
    selector: 'app-weatherdetail',
    templateUrl: './weatherdetail.component.html',
    styleUrls: ['./weatherdetail.component.css', '../../styles/global.css']
})

export class WeatherDetailComponent {
sunnyImg:string;
constructor(private weatherService: WeatherService){}

ngOnInit() {
    let demoWeather:IWeeklyWeather={};
    demoWeather.dayWeather='sunny'
    this.sunnyImg =  this.weatherService.getWeatherStatusImage(demoWeather)
}

}