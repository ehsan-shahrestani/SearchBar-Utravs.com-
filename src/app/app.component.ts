import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fatap-interview';
  openlist: boolean = false
  Innercitys: string[] = ["تهران", "شیراز", "بوشهر", "مشهد", "کیش", "سمنان"]
  Foreigncitys: string[] = ["برلین", "استانبول", "لندن", "دبی", "سوئیس", "کانادا"]
  Form!: FormGroup
  value!: string
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.Form = this.fb.group({
      des: [""]
    })
  }
  Openckick() {
    this.openlist = true

  }
  Closeckick() {
    this.openlist = false
  }
  selectValue(cityName: string) {
    // this.Form.patchValue({ "des": cityName });
    this.openlist = false

  }
}
