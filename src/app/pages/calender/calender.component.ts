import { Component, NgZone, Input } from '@angular/core';
import { CommonFunction } from '../../service';
import { IWeekDay, IMonthDetail, IMonthCalender } from '../../interfaces/icalender';
import { SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['../../styles/global.css', './calender.component.css']
})

export class CalenderComponent {
    weekDays: IWeekDay[]
    divForrWeek: Array<number> = new Array();
    @Input() monthlyCalender: IMonthDetail;
    calender: IMonthDetail;
    thisMonthCalender: IMonthCalender[] = [];

    constructor(private commonFunction: CommonFunction, private _zone: NgZone) {
        this.getWeekDays();
        this.createDivForWeek();

    }

    ngOnInit() {
        // this.commonFunction.getCalenderDetail.subscribe((calender:any)=>{

        // })
    }

    getWeekDays() {
        this.commonFunction.getWeekDays().subscribe((weekdays: IWeekDay[]) => {
            this.weekDays = weekdays;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['monthlyCalender']) {
            this.createDivForWeek();
            this.updateCalenderForBirthday();
        }
    }

    createDivForWeek() {
        if (this.monthlyCalender) {
            var startDay = this.getStartDateForCalender();
            var thisMonthCalenderDay = 1;
            for (let i = 1; i <= 35; i++) {
                this.divForrWeek.push(i);
                let setEachDayForThisCalender: IMonthCalender = { id: i, day: null };
                if (i >= startDay && thisMonthCalenderDay <= this.monthlyCalender.totalDaysInThisMonth) {
                    setEachDayForThisCalender.day = thisMonthCalenderDay;
                    thisMonthCalenderDay++;
                }
                this.thisMonthCalender.push(setEachDayForThisCalender);
            }

        }
    }

    ngAfterViewInit() {
        //this.updateCalenderForBirthday();
    }

    updateCalenderForBirthday() {
        if (!this.monthlyCalender)
            return;
        var birthDate = this.monthlyCalender.birthDays;
        this.thisMonthCalender.forEach(bday => {
            if (bday) {
                if (birthDate.filter(bdate => bdate.dayOfMonth == bday.day).length > 0) {
                    var bdayDiv = document.getElementById(bday.id.toString());
                    if (bdayDiv)
                        bdayDiv.querySelector("div").style.backgroundColor = "red";

                    //innerDiv.ba
                }
            }
        })
    }

    getStartDateForCalender(): Number {
        var result;
        switch (this.monthlyCalender.firstDayOfMonth.toUpperCase()) {
            case "MONDAY": {
                result = 1;
                break;
            }
            case "TUESDAY": {
                result = 2;
                break;
            }
            case "WEDNESDAY": {
                result = 3;
                break;
            }
            case "THURSDAY": {
                result = 4;
                break;
            }
            case "FIRDAY": {
                result = 5;
                break;
            }
            case "SATURDAY": {
                result = 6;
                break;
            }
            case "SUNDAY": {
                result = 7;
                break;
            }
        }
        return result;
    }


}
