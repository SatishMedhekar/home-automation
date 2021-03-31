import { Component, NgZone } from '@angular/core';
import { IWeather, IWeeklyWeather } from '../../interfaces/iweather';
import { CommonFunction } from '../../service';
import { IMonthCalender, IMonthDetail } from '../../interfaces/icalender';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', '../../styles/global.css']
})

export class HomeComponent {

    weeklyWeather: any[];
    weather: any;
    monthlyCalender: IMonthDetail;
    constructor(private commonFunction: CommonFunction, private _zone: NgZone) { }

    ngOnInit() {
        console.log('********************')
        this.getWeather();
        this.getCalenderDetail();
        if(this.monthlyCalender == null)
            this.monthlyCalender = this.commonFunction.getCalenderFromStore()
    }

   

    getWeather() {
        this.commonFunction.weatherReceivedFromServer()
            .subscribe(message => {
                this.weather = message;
                this._zone.run(() => {
                    this.setWeeklyWeather(this.weather.weeklyWeather);
                })
            });
    }

    getCalenderDetail() {
        this.commonFunction.calenderReceivedFromServer()
            .subscribe(message => {
                console.log(`CalenderReceivedFromServer -> ${JSON.stringify(message)}`)
                this.monthlyCalender = <IMonthDetail>message;
                
            });
    }

    setWeeklyWeather(weeklyWeather: IWeeklyWeather[]) {
        this.weeklyWeather = weeklyWeather;
    }

}