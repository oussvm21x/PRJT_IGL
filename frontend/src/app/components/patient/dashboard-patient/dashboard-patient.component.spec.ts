import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMdcnComponent } from './dashboard-patient.component';

describe('DashboardMdcnComponent', () => {
  let component: DashboardMdcnComponent;
  let fixture: ComponentFixture<DashboardMdcnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMdcnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMdcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
