import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardinfComponent } from './dashboard-mdcn.component';

describe('DashboardMdcnComponent', () => {
  let component: DashboardinfComponent;
  let fixture: ComponentFixture<DashboardinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
