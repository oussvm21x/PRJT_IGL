import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsinfComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsinfComponent;
  let fixture: ComponentFixture<NotificationsinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
