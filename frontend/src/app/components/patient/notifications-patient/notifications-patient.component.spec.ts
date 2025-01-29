import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationspatientComponent } from './notifications-patient.component';

describe('NotificationsComponent', () => {
  let component: NotificationspatientComponent;
  let fixture: ComponentFixture<NotificationspatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationspatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationspatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
