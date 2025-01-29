import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrespharmaComponent } from './parametres.component';

describe('ParametresComponent', () => {
  let component: ParametrespharmaComponent;
  let fixture: ComponentFixture<ParametrespharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrespharmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrespharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
