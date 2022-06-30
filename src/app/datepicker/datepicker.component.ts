import { Component, EventEmitter, HostListener, Injectable, OnInit, Output } from '@angular/core';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, observable } from 'rxjs';
// ['دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه']
let WEEKDAYS_SHORT = ['دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه']
  ;
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class DatepickerComponent implements OnInit {
  model!: NgbDateStruct;
  date!: { year: number, month: number };


  scrWidth: any;


  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= 1024) {
      this.displayMonths = 1;
      WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی']
    } else {
      this.displayMonths = 2;
       WEEKDAYS_SHORT= []
       WEEKDAYS_SHORT = ['دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه']

    }
  }


  constructor(
    private calendar: NgbCalendar,) {
    this.getScreenSize()

  }

  displayMonths = 2;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';






  @Output() data = new EventEmitter<NgbDateStruct>();
  @Output() closeDatePicker = new EventEmitter<boolean>();


  ngOnInit(): void {


  }
  selectToday() {
    this.model = this.calendar.getToday();
    this.data.emit(this.model);


  }
  selectday() {
    this.data.emit(this.model);
    this.closeDatePicker.emit(false)

  }
 
  onCloseDatePicker() {
    this.closeDatePicker.emit(false)
  }

}
