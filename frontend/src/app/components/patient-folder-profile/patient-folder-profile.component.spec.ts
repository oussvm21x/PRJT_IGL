import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFolderProfileComponent } from './patient-folder-profile.component';

describe('PatientFolderProfileComponent', () => {
  let component: PatientFolderProfileComponent;
  let fixture: ComponentFixture<PatientFolderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFolderProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFolderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
