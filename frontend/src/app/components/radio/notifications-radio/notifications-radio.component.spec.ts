import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsRadioComponent } from './notifications-radio.component';

describe('NotificationsRadioComponent', () => {
  let component: NotificationsRadioComponent;
  let fixture: ComponentFixture<NotificationsRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
