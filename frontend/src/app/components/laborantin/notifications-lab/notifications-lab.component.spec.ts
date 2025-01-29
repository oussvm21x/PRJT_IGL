import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsLabComponent } from './notifications-lab.component';

describe('NotificationsLabComponent', () => {
  let component: NotificationsLabComponent;
  let fixture: ComponentFixture<NotificationsLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
