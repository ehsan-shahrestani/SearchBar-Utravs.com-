import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fatap-interview';
  test: boolean = true
  citys: string[] = ["تهران", "شیراز", "بوشهر", "مشهد"]
  Form!: FormGroup
  value!: string
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.Form = this.fb.group({
      des: [""]
    })




    this.Form.patchValue({});
  }
  Openckick() {
    this.test = false
  }
  Closeckick() {
    this.test = true
  }
}
