import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosChiffresComponent } from './nos-chiffres.component';

describe('NosChiffresComponent', () => {
  let component: NosChiffresComponent;
  let fixture: ComponentFixture<NosChiffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosChiffresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosChiffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
