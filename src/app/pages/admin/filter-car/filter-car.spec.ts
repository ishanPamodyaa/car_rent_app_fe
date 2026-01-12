import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCar } from './filter-car';

describe('FilterCar', () => {
  let component: FilterCar;
  let fixture: ComponentFixture<FilterCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
