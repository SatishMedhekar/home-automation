import { Component } from '@angular/core';
import { IHourlyForecast, IWeeklyWeather } from 'src/app/interfaces/iweather';
import { WeatherService } from './service/weather.service';

@Component({
    selector: 'app-weatherdetail',
    templateUrl: './weatherdetail.component.html',
    styleUrls: ['./weatherdetail.component.css', '../../styles/global.css']
})

export class WeatherDetailComponent {
dayImg:string;
nightImg:string;
hourlyforecast:IHourlyForecast[];

constructor(private weatherService: WeatherService){}

ngOnInit() {
    let demoWeather:IWeeklyWeather={};
    demoWeather.dayWeather='sunny'
    this.dayImg =  this.weatherService.getWeatherStatusImage(demoWeather)
    demoWeather.dayWeather='night'
    this.nightImg =  this.weatherService.getWeatherStatusImage(demoWeather)

    this.hourlyforecast = HourlyForecast;
    let forecastImage:IWeeklyWeather={};
    this.hourlyforecast.forEach(a=>{
        forecastImage.dayWeather=a.weatherImage      
        a.weatherImage = this.weatherService.getWeatherStatusImage(forecastImage)
    })
}

}

const HourlyForecast:IHourlyForecast[]=[ {time:'1:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'2:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'3:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'4:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'5:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'6:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'7:00 AM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'8:00 AM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'9:00 AM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'10:00 AM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'11:00 AM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'12:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'13:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'14:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'15:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'16:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'17:00 PM',weatherImage:'sunny', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'18:00 PM',weatherImage:'rain', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'19:00 PM',weatherImage:'rain', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'20:00 PM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'21:00 PM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'22:00 PM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'23:00 PM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  },
                                         {time:'24:00 PM',weatherImage:'night', forecast:'59 Mostly Clear', precip:'0%'  }]
                                         