import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresinfComponent } from './parametres.component';

describe('ParametresComponent', () => {
  let component: ParametresinfComponent;
  let fixture: ComponentFixture<ParametresinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametresinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
