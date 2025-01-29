import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrespatientComponent } from './parametres-patient.component';

describe('ParametresComponent', () => {
  let component: ParametrespatientComponent;
  let fixture: ComponentFixture<ParametrespatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrespatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrespatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
