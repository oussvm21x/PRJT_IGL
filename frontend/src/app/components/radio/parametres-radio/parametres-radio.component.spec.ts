import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresRadioComponent } from './parametres-radio.component';

describe('ParametresRadioComponent', () => {
  let component: ParametresRadioComponent;
  let fixture: ComponentFixture<ParametresRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametresRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
