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

export { ICurrentWeather, IWeeklyWeather, IWeather }