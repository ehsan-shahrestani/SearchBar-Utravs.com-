import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fatap-interview';

  Innercitys: string[] = ["تهران", "شیراز", "بوشهر", "مشهد", "کیش", "سمنان"]
  Foreigncitys: string[] = ["برلین", "استانبول", "لندن", "دبی", "سوئیس", "کانادا"]

  @ViewChild('orginInput') orginInput!: ElementRef;
  @ViewChild('passengerInput') passengerInput!: ElementRef;

  dropdownState: 'left' | 'right' = 'right';
  PlaceForm!: FormGroup
  radioInputForm!: FormGroup

  adultPassengerCount: number = 0
  childPassengerCount: number = 0
  babyPassengerCount: number = 0

  passengerCount!: number

  openList: boolean = false
  openPassengerLIst: boolean = false
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.PlaceForm = this.fb.group({
      destination: [""],
      origin: [""]
    })

    this.radioInputForm = this.fb.group({
      radioInput: ["oneWay"]
    })

  }
  onChangeAmountInput() {
    let des = this.PlaceForm.controls['destination'].value
    let origin = this.PlaceForm.controls['origin'].value
    let temp = des
    this.PlaceForm.controls['destination'].setValue(origin)
    this.PlaceForm.controls['origin'].setValue(temp)

    



  }

  onOpenList() {
    this.openList = !this.openList
  }
  onOpenDatepicker() {

  }
  onOpenPassengerLIst() {

    this.openPassengerLIst = !this.openPassengerLIst
  }



  onClickDestination() {
    this.onOpenList()
    this.dropdownState = 'right'
  }

  onClickOrigin() {
    this.onOpenList()
    this.dropdownState = 'left'
  }


  onSelectItem(city: string) {
    const targetField = this.dropdownState === 'right' ? 'destination' : 'origin';
    this.PlaceForm.controls[targetField].setValue(city)

    if (targetField == 'destination') {
      this.orginInput.nativeElement.focus();
    }
    if (targetField == 'origin') {
      this.passengerInput.nativeElement.focus()
      this.onOpenPassengerLIst()
    }
    this.onOpenList()
  }



  // passengeer cunt

  onAddNumberAdult() {
    this.adultPassengerCount++
  }
  onDeductionNumberAdult() {
    if (this.adultPassengerCount > 0) {
      this.adultPassengerCount--
    }
  }
  // 
  onAddNumberCild() {
    this.childPassengerCount++
  }
  onDeductionNumberCild() {
    if (this.childPassengerCount > 0) {
      this.childPassengerCount--
    }
  }


  onAddNumberBaby() {
    this.babyPassengerCount++
  }
  onDeductionNumberBaby() {
    if (this.babyPassengerCount > 0) {
      this.babyPassengerCount--
    }
  }

}
