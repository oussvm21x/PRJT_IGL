import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFolderConsultationsComponent } from './patient-folder-consultations.component';

describe('PatientFolderConsultationsComponent', () => {
  let component: PatientFolderConsultationsComponent;
  let fixture: ComponentFixture<PatientFolderConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFolderConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFolderConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
