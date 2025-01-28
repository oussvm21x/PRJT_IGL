import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLabComponent } from './sidebar-lab.component';

describe('SidebarLabComponent', () => {
  let component: SidebarLabComponent;
  let fixture: ComponentFixture<SidebarLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
