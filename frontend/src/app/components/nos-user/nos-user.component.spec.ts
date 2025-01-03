import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosUserComponent } from './nos-user.component';

describe('NosUserComponent', () => {
  let component: NosUserComponent;
  let fixture: ComponentFixture<NosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
