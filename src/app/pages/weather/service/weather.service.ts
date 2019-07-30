import { Injectable } from '@angular/core';
import { IWeeklyWeather } from '../../../interfaces/iweather';
declare var require: any;
@Injectable()
export class WeatherService {

    getWeatherStatusImage(perDayWeather: IWeeklyWeather): string {
        let result: string;
        switch (perDayWeather.dayWeather.toLowerCase()) {
            case "cloudy": {
                result = this.getImage("blackcloud");
                break;
            }
            case "shower": {
                result = this.getImage("dizzling");
                break;
            }
            case "rain": {
                result = this.getImage("rain");
                break;
            }
            case "mostly sunny": {
                result = this.getImage("littlecloudsun");
                break;
            }
            case "sunny": {
                result = this.getImage("sun");
                break;
            }
            case "thunderstorm": {
                result = this.getImage("nightthunderstorm");
                break;
            }
            case "slight chance of rain": {
                result = this.getImage("sunlittlecloudrain");
                break;
            }
            case "hot": {
                result = this.getImage("hotsun");
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
        return result;
    }

    getImage(weatherStatus: string): any {
        let result: string;
        switch (weatherStatus) {
            case "sun": {
                return require("../../../images/Pics/sun.png");
            }
            case "suncloud": {
                return require("../../../images/Pics/suncloud.png");
            }
            case "sunrain": {
                return require("../../../images/Pics/sunrain.png");
            }
            case "hotsun": {
                return require("../../../images/Pics/hotsun.png");
            }
            case "littlecloudsun": {
                return require("../../../images/Pics/littlecloudsun.png");
            }
            case "moderatecloudsun": {
                return require("../../../images/Pics/moderatecloudsun.png");
            }
            case "sunlittlecloudrain": {
                return require("../../../images/Pics/sunlittlecloudrain.png");
            }
            case "sunmorecloudrain": {
                return require("../../../images/Pics/sunmorecloudrain.png");
            }
            case "sunverylittlecloud": {
                return require("../../../images/Pics/sunverylittlecloud.png");
            }
            case "night": {
                return require("../../../images/Pics/night.png");
            }
            case "nightcloud": {
                return require("../../../images/Pics/nightcloud.png");
            }
            case "nightrain": {
                return require("../../../images/Pics/45.png");
            }
            case "windnight": {
                return require("../../../images/Pics/windnight.png");
            }
            case "dizzlingcloudynight": {
                return require("../../../images/Pics/dizzlingcloudynight.png");
            }
            case "littlecloudynight": {
                return require("../../../images/Pics/littlecloudynight.png");
            }
            case "nightthunderstorm": {
                return require("../../../images/Pics/nightthunderstorm.png");
            }
            case "morecloudynight": {
                return require("../../../images/Pics/morecloudynight.png");
            }
            case "lesscloudynight": {
                return require("../../../images/Pics/lesscloudynight.png");
            }
            case "blackcloud": {
                return require("../../../images/Pics/blackcloud.png");
            }
            case "blacklittlecloud": {
                return require("../../../images/Pics/blacklittlecloud.png");
            }
            case "greylittlecloud": {
                return require("../../../images/Pics/greylittlecloud.png");
            }
            case "whitelittlecloud": {
                return require("../../../images/Pics/whitelittlecloud.png");
            }
            case "rain": {
                return require("../../../images/Pics/10rain.png");
            }
            case "dizzling": {
                return require("../../../images/Pics/13rain.png");
            }
            default: {
                return require("../../../images/Pics/13rain.png");
            }
        }
    }
}