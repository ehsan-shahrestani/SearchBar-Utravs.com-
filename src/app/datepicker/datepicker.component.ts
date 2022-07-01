import { Component, EventEmitter, HostListener, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';

import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDate, NgbDateParserFormatter, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('dp') dp!: NgbDatepicker;

  @Output() data = new EventEmitter<NgbDateStruct>();
  @Output() closeDatePicker = new EventEmitter<boolean>();
  @Input() roundTrip!: boolean
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= 1024) {
      this.displayMonths = 1;
      WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی']
    } else {
      this.displayMonths = 2;
      WEEKDAYS_SHORT = []
      WEEKDAYS_SHORT = ['دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه']

    }
  }


  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.getScreenSize()
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday()
  }

  model!: NgbDateStruct;
  date!: { year: number, month: number };
  scrWidth: any;
  hoveredDate: NgbDate | null = null;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;
  displayMonths = 2;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';



  mindate!:NgbDate 

  ngOnInit(): void {
    this.mindate = this.calendar.getToday();

  }
  // start range

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }





  // end renge
  selectToday() {
    this.model = this.calendar.getToday();
    this.data.emit(this.model);
    this.dp.navigateTo()

  }
  selectday() {
    this.data.emit(this.model);
    // this.closeDatePicker.emit(false)
  }

  onCloseDatePicker() {
    this.closeDatePicker.emit(false)
  }
}
