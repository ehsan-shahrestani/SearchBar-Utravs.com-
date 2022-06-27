import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fatap-interview';
  test:boolean=true
  city : string = "تهران"
  ngOnInit(): void {
  }
 Openckick(){
    this.test = false
  }
  Closeckick(){
    this.test = true
  }
}
