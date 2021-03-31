interface ICurrentWeather {
    currentTemperature?: string;
    currentWeatherStatus?: string;
    currentTemperatureUrl?: string;
}


interface IWeeklyWeather {
    day?: string;
    dayWeather?: string;
    minTemperature?: string;
    maxTemperature?: string;
    weatherImage?: string;
}

interface IWeather {
    currentTemperature?: ICurrentWeather;
    weeklyWeather?: IWeeklyWeather[];
}

interface IHourlyForecast{
    time?:string;
    weatherImage?:string;
    forecast?:string;
    precip?:string;
}

export { ICurrentWeather, IWeeklyWeather, IWeather, IHourlyForecast }