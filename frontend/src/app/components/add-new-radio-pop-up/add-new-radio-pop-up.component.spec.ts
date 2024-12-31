import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRadioPopUpComponent } from './add-new-radio-pop-up.component';

describe('AddNewRadioPopUpComponent', () => {
  let component: AddNewRadioPopUpComponent;
  let fixture: ComponentFixture<AddNewRadioPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewRadioPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRadioPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
