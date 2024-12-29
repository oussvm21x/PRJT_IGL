import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFolderAntecedentsComponent } from './patient-folder-antecedents.component';

describe('PatientFolderAntecedentsComponent', () => {
  let component: PatientFolderAntecedentsComponent;
  let fixture: ComponentFixture<PatientFolderAntecedentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFolderAntecedentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFolderAntecedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
