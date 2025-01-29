import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsinfComponent } from './patients.component';

describe('PatientsComponent', () => {
  let component: PatientsinfComponent;
  let fixture: ComponentFixture<PatientsinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
