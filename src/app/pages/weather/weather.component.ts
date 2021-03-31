import { Component, Input } from '@angular/core';
import { IWeeklyWeather } from "../../interfaces/iweather";
import { CommonFunction } from "../../service";
import { SimpleChanges } from "@angular/core";
import { WeatherService } from "./service/weather.service";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weatherdetail.component.css', '../../styles/global.css']
})


export class WeatherComponent {
    @Input() perDayWeather: IWeeklyWeather;


    constructor(private commonFunction: CommonFunction, private weatherService: WeatherService) { }

    ngOnInit() {
        this.setWeatherStatusImage();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['perDayWeather'])
            this.setWeatherStatusImage();
    }

    setWeatherStatusImage() {
        this.perDayWeather.weatherImage = this.weatherService.getWeatherStatusImage(this.perDayWeather);
    }


}