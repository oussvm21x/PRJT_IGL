import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresLabComponent } from './parametres-lab.component';

describe('ParametresLabComponent', () => {
  let component: ParametresLabComponent;
  let fixture: ComponentFixture<ParametresLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametresLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
