import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPatientinfComponent } from './modifier-patient.component';

describe('ModifierPatientComponent', () => {
  let component: ModifierPatientinfComponent;
  let fixture: ComponentFixture<ModifierPatientinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPatientinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierPatientinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
