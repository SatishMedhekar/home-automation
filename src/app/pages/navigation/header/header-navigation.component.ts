import { Component, Input } from '@angular/core';
import { ICurrentWeather, IWeeklyWeather } from '../../../interfaces/iweather';
import { CommonFunction } from '../../../service';
import { NgZone } from '@angular/core';
import { WeatherService } from '../../weather/service/weather.service';
declare var require: any;

@Component({
    selector: 'header-navigation',
    templateUrl: './header-navigation.component.html',
    styleUrls: ['./header-navigation.component.css', '../../../main/app.component.css']
})

export class HeaderNavigation {
    currentTempurateStatus: ICurrentWeather = {};
    @Input() title: string;
    weather: any;


    constructor(private commonFunction: CommonFunction, private _zone: NgZone, private weatherService: WeatherService) {

    }

    ngOnInit() {
        this.getWeather();
    }

    getWeather() {
        this.commonFunction.weatherReceivedFromServer()
            .subscribe(message => {
                this.weather = message;

                this._zone.run(() => {
                    this.setCurrentTemperature(this.weather.currentTemperature);
                })
            });
    }

    setCurrentTemperature(currentTemperature: ICurrentWeather) {
        this.currentTempurateStatus.currentTemperature = currentTemperature.currentTemperature;
        this.currentTempurateStatus.currentWeatherStatus = currentTemperature.currentWeatherStatus;
        let todaysImage: IWeeklyWeather = {};
        todaysImage.dayWeather = this.currentTempurateStatus.currentWeatherStatus;
        this.currentTempurateStatus.currentTemperatureUrl = this.weatherService.getWeatherStatusImage(todaysImage);
        this.title = 'Home';

    }


}