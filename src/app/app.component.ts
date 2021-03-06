import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ duration: 500, delay: 100 }),

    fadeOutDownOnLeaveAnimation({ duration: 500, delay: 100 }),
  ]

})
export class AppComponent implements OnInit {




  model!: NgbDateStruct;
  date!: { year: number, month: number };
  title = 'fatap-interview';

  Innercitys: string[] = ["تهران", "شیراز", "بوشهر", "مشهد", "کیش", "سمنان"]
  Foreigncitys: string[] = ["برلین", "استانبول", "لندن", "دبی", "سوئیس", "کانادا"]

  @ViewChild('orginInput') orginInput!: ElementRef;
  @ViewChild('passengerInput') passengerInput!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;

  dropdownState: 'left' | 'right' = 'right';

  PlaceForm!: FormGroup
  radioInputForm!: FormGroup

  adultPersonCount: number = 1
  childPersonCount: number = 0
  babyPersonCount: number = 0

  allPersonCount: number = 1

  openCityList: boolean = false
  openPassengerLIst: boolean = false
  openDatePicker: boolean = false
  //

  constructor(
    private fb: FormBuilder,
    public formatter: NgbDateParserFormatter

  ) { }
  form!: FormGroup

  rundeTrip: boolean = true

  ngOnInit(): void {

    this.PlaceForm = this.fb.group({
      destination: [""],
      origin: [""]
    })

    this.radioInputForm = this.fb.group({
      radioInput: ["oneWay"]
    })

    this.radioInputForm.controls['radioInput'].valueChanges.subscribe(res => {
      if (res == "oneWay") {
        this.rundeTrip = true
      } else if (res == "twoway") {
        this.rundeTrip = false
      }
    })

  }
  onChangeAmountInput() {
    let des = this.PlaceForm.controls['destination'].value
    let origin = this.PlaceForm.controls['origin'].value
    let temp = des
    this.PlaceForm.controls['destination'].setValue(origin)
    this.PlaceForm.controls['origin'].setValue(temp)
  }
  onCloseList() {
    this.openCityList = false
    this.openDatePicker = false
    this.openPassengerLIst = false
  }
  //  open date picker
  onOpenDatepicker() {
    this.openDatePicker = true
    this.openPassengerLIst = false
    this.openCityList = false
  }
  onClickDateInput() {
    this.openDatePicker = true
  }
  onclosedatePicker(data: boolean) {
    this.openDatePicker = data

    if (!data) {
      this.passengerInput.nativeElement.focus()
    }


  }

  // open list passenger
  onOpenPassengerLIst() {
    this.openPassengerLIst = true
    this.openCityList = false
    this.openDatePicker = false

  }
  onClickPassengerInput() {
    this.openPassengerLIst = true
  }

  onClosePassengerLIst() {
    this.openPassengerLIst = false

  }

  // open list city
  onOpenList() {
    this.openCityList = !this.openCityList
  }
  onClickDestination() {
    this.openCityList = true
    this.dropdownState = 'right'
    this.openPassengerLIst = false
    this.openDatePicker = false
  }

  onClickOrigin() {
    this.openCityList = true
    this.dropdownState = 'left'
    this.openPassengerLIst = false
    this.openDatePicker = false


  }


  onSelectItem(city: string) {
    const targetField = this.dropdownState === 'right' ? 'destination' : 'origin';
    this.PlaceForm.controls[targetField].setValue(city)

    if (targetField == 'destination' && screen.width >= 1024) {
      this.orginInput.nativeElement.focus();
      this.onOpenList()
    }
    if (targetField == 'origin' && screen.width >= 1024) {
      this.dateInput.nativeElement.focus()

      this.onOpenDatepicker()
      this.onOpenList()

    }
    this.onOpenList()
  }



  // passengeer cunt
  increaseAdultPerson() {
    if (this.validateIncreasePersonCount()) {
      this.adultPersonCount++;
      this.allPersonCount++;
    }
  }

  increaseChildPerson() {
    if (this.validateIncreaseChildPersonCount()) {
      this.childPersonCount++;
      this.allPersonCount++;
    }
  }

  increaseBabyPerson() {

    if (this.validateIncreaseBabyPersonCount()) {
      this.babyPersonCount++;
      this.allPersonCount++;
    }

  }

  decreaseAdultPerson() {
    if (this.validateDecreaseAdultPersonCount()) {
      this.adultPersonCount--;
      this.allPersonCount--;
      if (this.babyPersonCount > this.adultPersonCount) {
        this.babyPersonCount--
        this.allPersonCount--
      }
    }
  }

  decreaseChildPerson() {
    if (this.validateDecreaseChildPersonCount()) {
      this.childPersonCount--;
      this.allPersonCount--;
    }
  }

  decreaseBabyPerson() {
    if (this.validateDecreaseBabyPersonCount()) {
      this.babyPersonCount--;
      this.allPersonCount--;
    }
  }

  validateIncreasePersonCount(): boolean {
    return (this.allPersonCount - this.babyPersonCount) < 9;
  }

  validateIncreaseChildPersonCount(): boolean {
    return (this.allPersonCount - this.babyPersonCount) < 9 && this.adultPersonCount > 0;
  }

  validateIncreaseBabyPersonCount(): boolean {
    return this.babyPersonCount < this.adultPersonCount
  }


  validateDecreaseAdultPersonCount(): boolean {
    return this.adultPersonCount > 1;
  }

  validateDecreaseChildPersonCount(): boolean {
    return this.childPersonCount > 0;
  }

  validateDecreaseBabyPersonCount(): boolean {
    return this.babyPersonCount > 0
  }


  dataDatePicker!: NgbDateStruct
  dataOneWayDatepicker(data: NgbDateStruct) {
    // console.log(data);
    
    this.dataDatePicker = data
    this.onOpenDatepicker()
  }

  dataToDate!:NgbDate
  dataToDateDatepicker(data:NgbDate){
    this.dataToDate = data
  }
  dataFromDate!:NgbDate
  dataFromDateDatepicker(data:NgbDate){
    this.dataFromDate = data
    
  }

}

