import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpharmaComponent } from './dashboard-mdcn.component';

describe('DashboardMdcnComponent', () => {
  let component: DashboardpharmaComponent;
  let fixture: ComponentFixture<DashboardpharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardpharmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
