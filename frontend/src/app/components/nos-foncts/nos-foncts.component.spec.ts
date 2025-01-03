import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosFonctsComponent } from './nos-foncts.component';

describe('NosFonctsComponent', () => {
  let component: NosFonctsComponent;
  let fixture: ComponentFixture<NosFonctsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosFonctsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosFonctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
