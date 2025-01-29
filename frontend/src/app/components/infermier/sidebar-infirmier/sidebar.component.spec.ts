import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarinfComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarinfComponent;
  let fixture: ComponentFixture<SidebarinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
