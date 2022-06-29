import { TestBed } from '@angular/core/testing';

import { DatepickerService } from './datepicker.service';

describe('DatepickerService', () => {
  let service: DatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
