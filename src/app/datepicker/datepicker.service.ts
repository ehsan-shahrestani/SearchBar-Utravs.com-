import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {
  date = new BehaviorSubject(null)
  constructor() { }
}
