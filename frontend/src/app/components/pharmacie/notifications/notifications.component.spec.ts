import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationspharmaComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationspharmaComponent;
  let fixture: ComponentFixture<NotificationspharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationspharmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationspharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
