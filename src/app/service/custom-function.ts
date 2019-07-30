import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of, Observer } from 'rxjs';
import { IPhoto } from '../interfaces/iphoto';
import { IMenu } from '../interfaces/imenu';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {  IWeather } from '../interfaces/iweather';
import { IWeekDay } from '../interfaces/icalender';
import { IMonthDetail } from '../interfaces/icalender'
import * as io from 'socket.io-client';
declare var require: any;
const SERVER_URL = 'http://localhost:8808';

@Injectable()

export class CommonFunction {
    socket: any;
    observer: Observer<any>;
    @Output() isToBeResetToMain: EventEmitter<boolean> = new EventEmitter();
    constructor(private http: HttpClient) {
        this.socket = io.connect(SERVER_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 99999
        });
    }

    getPhotoList(): IPhoto[] {
        let photolist: IPhoto[];
        photolist = [
            { id: 1, path: '../images/', PhotoName: 'night.jpg' },
            { id: 2, path: '../images/', PhotoName: 'CloudyNight' },
            { id: 3, path: '../images/weather/', PhotoName: 'frostsuncloud.png' },
            { id: 4, path: '../images/weather/', PhotoName: 'nightcloud.png' },
            { id: 5, path: '../images/weather/', PhotoName: 'nightcloudfrost.png' },
            { id: 6, path: '../images/weather/', PhotoName: 'nightrain.png' },
            { id: 7, path: '../images/weather/', PhotoName: 'rain.png' },
            { id: 8, path: '../images/weather/', PhotoName: 'sun.png' },
            { id: 9, path: '../images/weather/', PhotoName: 'suncloud.png' },
            { id: 10, path: '../images/weather/', PhotoName: 'sunrain.png' },
            { id: 11, path: '../images/weather/', PhotoName: 'windnight.png' },
            { id: 12, path: '../images/weather/', PhotoName: 'frostsuncloud.png' },
            { id: 13, path: '../images/Pics/', PhotoName: '0rain.png' },
            { id: 14, path: '../images/Pics/', PhotoName: '5rain.png' },
            { id: 15, path: '../images/Pics/', PhotoName: 'blackcloud.png' },
            { id: 16, path: '../images/Pics/', PhotoName: 'blacklittlecloud.png' },
            { id: 17, path: '../images/Pics/', PhotoName: 'cloudynight.png' },
            { id: 18, path: '../images/Pics/', PhotoName: 'greylittlecloud.png' },
            { id: 19, path: '../images/Pics/', PhotoName: 'hotsun.png' },
            { id: 20, path: '../images/Pics/', PhotoName: 'littlecloudsun.png' },
            { id: 21, path: '../images/Pics/', PhotoName: 'moderatecloudsun.png' },
            { id: 22, path: '../images/Pics/', PhotoName: 'sunmorecloudrain.png' },
            { id: 23, path: '../images/Pics/', PhotoName: 'sunverylittlecloud.png' },
        ]
        return photolist;
    }



    uploadWeatherImages(): void {
        require('../images/Pics/sun.png')
        require('../images/Pics/suncloud.png')
        require('../images/Pics/sunrain.png')
        require('../images/Pics/hotsun.png')
        require('../images/Pics/littlecloudsun.png')
        require('../images/Pics/moderatecloudsun.png')
        require('../images/Pics/sunlittlecloudrain.png')
        require('../images/Pics/sunmorecloudrain.png')
        require('../images/Pics/sunverylittlecloud.png')
        require('../images/Pics/night.png')
        require('../images/Pics/nightcloud.png')
        require('../images/Pics/45.png')
        require('../images/Pics/windnight.png')
        require('../images/Pics/dizzlingcloudynight.png')
        require('../images/Pics/littlecloudynight.png')
        require('../images/Pics/nightthunderstorm.png')
        require('../images/Pics/morecloudynight.png')
        require('../images/Pics/lesscloudynight.png')
        require('../images/Pics/blackcloud.png')
        require('../images/Pics/blacklittlecloud.png')
        require('../images/Pics/greylittlecloud.png')
        require('../images/Pics/whitelittlecloud.png')
        require('../images/Pics/10rain.png')
        require('../images/Pics/13rain.png')
    }

    ngOnInit() {
        this.calenderReceivedFromServer().subscribe(calender => {
            //this.getCalenderDetail.emit(calender);
            this.isToBeResetToMain.emit(true);
        })
    }

    resetToMainForm(isTriggered: boolean) {
        this.isToBeResetToMain.emit(false);
        var cntr = 1;

        setInterval(() => {
            if (cntr > 2) {
                this.isToBeResetToMain.emit(true);
                console.log('Set it to true');
            }
            cntr = cntr + 1;
        }, 60 * 1000);
    }

    weatherReceivedFromServer() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data: any) => { observer.next(data) });
            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

    calenderReceivedFromServer() {
        let observable = new Observable(observer => {
            this.socket.on('calender', (data: any) => {
                observer.next(data);
                console.log(`Calender value -> ${JSON.stringify(data)}`);
            });

            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

    createObservable(): Observable<any> {
        return new Observable(observer => {
            this.observer = observer
        });
    }

    getMenu(): Observable<IMenu[]> {
        // let subject = new BehaviorSubject <IMenu[]>(navigationMenu);
        // subject.next(navigationMenu);
        // return subject;
        return this.http.get<IMenu[]>('http://localhost:8808/api/notes')
            .pipe(tap(data => console.log('In Service: ' + JSON.stringify(data))),
                catchError(this.handleError<IMenu[]>('getMenu', [])))
    }

    getWeather(): Observable<IWeather> {
        let subject = new BehaviorSubject<IWeather>(Weather);
        subject.next(Weather);
        return subject;
        // return this.http.get<IWeeklyWeather[]>('http://localhost:8808/api/Weather')
        // .pipe( tap(data => console.log('In Service: ' + JSON.stringify(data))),
        //        catchError(this.handleError<IWeeklyWeather[]>('getMenu',[])))
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return of(result as T);
        }
    }

    downloadFile(data: any) {
        let blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", "Enterprise.csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    getWeekDays(): Observable<IWeekDay[]> {
        let subject = new BehaviorSubject<IWeekDay[]>(weekDays);
        subject.next(weekDays);
        return subject;
    }

    getCalenderDetail(): IMonthDetail {
        return monthDetail;
    }

}


const monthDetail: IMonthDetail = {
    month: 'November',
    firstDayOfMonth: 'Thursday',
    birthDays: [{ dayOfMonth: 10 },],
    totalDaysInThisMonth: 30
}

const weekDays: IWeekDay[] = [{ id: 1, sortOrder: 0, name: 'Mon' },
{ id: 2, sortOrder: 1, name: 'Tue' },
{ id: 3, sortOrder: 2, name: 'Wed' },
{ id: 4, sortOrder: 3, name: 'Thu' },
{ id: 5, sortOrder: 4, name: 'Fri' },
{ id: 6, sortOrder: 5, name: 'Sat' },
{ id: 7, sortOrder: 6, name: 'Sun' }]

const Weather: IWeather = {
    currentTemperature: {
        currentTemperature: '70',
        currentTemperatureUrl: 'url',
        currentWeatherStatus: 'Cloudy'
    },
    weeklyWeather: [
        {
            day: 'Monday',
            dayWeather: 'Cloudy',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Tuesday',
            dayWeather: 'Shower',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Wednesday',
            dayWeather: 'Rain',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Thrusday',
            dayWeather: 'Mostly Sunny',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Friday',
            dayWeather: 'Sunny',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Saturday',
            dayWeather: 'Thunderstorm',
            minTemperature: '20',
            maxTemperature: '10',
            weatherImage: 'df'
        },
        {
            day: 'Sunday',
            dayWeather: 'Slight Chance of Rain',
            minTemperature: '12',
            maxTemperature: '10',
            weatherImage: 'df'
        }
    ]
}

// const navigationMenu:IMenu[] =[{menuType: Menu.LEFT,
//     menuDetail:[{id:'1', displayOrder: 0, name: 'Light', imagePath: '../images/Extras/', imageFileName: 'light24.ico'   },
//                 {id:'2', displayOrder: 1, name: 'Music', imagePath: '../images/Extras/', imageFileName: 'music24.ico'   },
//                 {id:'3', displayOrder: 2, name: 'Message', imagePath: '../images/Extras/', imageFileName: 'message24.ico'   }]  },
//     {menuType: Menu.RIGHT, 
//         menuDetail:[{id:'4', displayOrder: 0, name: 'Weather', imagePath: '../images/Extras/', imageFileName: 'temperature24.ico'   },
//                     {id:'5', displayOrder: 1, name: 'Calendar', imagePath: '../images/Extras/', imageFileName: 'calendar24.ico'   },
//                     {id:'6', displayOrder: 2, name: 'Setting', imagePath: '../images/Extras/', imageFileName: 'settings-25-16.ico'   }]  }]