import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPatientPopUpComponent } from './add-new-patient-pop-up.component';

describe('AddNewPatientPopUpComponent', () => {
  let component: AddNewPatientPopUpComponent;
  let fixture: ComponentFixture<AddNewPatientPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPatientPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPatientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
