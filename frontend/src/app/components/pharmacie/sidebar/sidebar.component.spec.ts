import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpharmaComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarpharmaComponent;
  let fixture: ComponentFixture<SidebarpharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarpharmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarpharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
