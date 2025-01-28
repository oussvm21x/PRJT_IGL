import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRadioComponent } from './layout-radio.component';

describe('LayoutRadioComponent', () => {
  let component: LayoutRadioComponent;
  let fixture: ComponentFixture<LayoutRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
