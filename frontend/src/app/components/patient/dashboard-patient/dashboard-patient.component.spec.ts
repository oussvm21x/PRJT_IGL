import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpatientComponent } from './dashboard-patient.component';

describe('DashboardMdcnComponent', () => {
  let component: DashboardpatientComponent;
  let fixture: ComponentFixture<DashboardpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
