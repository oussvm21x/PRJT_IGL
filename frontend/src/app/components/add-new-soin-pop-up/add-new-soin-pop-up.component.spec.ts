import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSoinPopUpComponent } from './add-new-soin-pop-up.component';

describe('AddNewSoinPopUpComponent', () => {
  let component: AddNewSoinPopUpComponent;
  let fixture: ComponentFixture<AddNewSoinPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewSoinPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSoinPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
