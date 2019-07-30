export interface IWeekDay {
    id: number;
    sortOrder: number;
    name: string;
}

export interface IMonthCalender {
    id: number;
    day?: number;
}

export interface IMonthDetail {
    month: string;
    firstDayOfMonth: string;
    totalDaysInThisMonth: number;
    birthDays: IBirthDay[];
}

export interface IBirthDay {
    birthDay?: Date
    dayOfMonth: number;
}

