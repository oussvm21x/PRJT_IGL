import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutpharmaComponent } from './layout.component';

describe('LayoutpharmaComponent', () => {
  let component: LayoutpharmaComponent;
  let fixture: ComponentFixture<LayoutpharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutpharmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutpharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
