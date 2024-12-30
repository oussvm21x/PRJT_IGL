import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFolderSoinsComponent } from './patient-folder-soins.component';

describe('PatientFolderSoinsComponent', () => {
  let component: PatientFolderSoinsComponent;
  let fixture: ComponentFixture<PatientFolderSoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFolderSoinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFolderSoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
