import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpatientComponent } from './sidebar-patient.component';

describe('SidebarComponent', () => {
  let component: SidebarpatientComponent;
  let fixture: ComponentFixture<SidebarpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
