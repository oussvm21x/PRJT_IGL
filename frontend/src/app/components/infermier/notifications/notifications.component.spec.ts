import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/src/app/components/patient/notifications-patient/notifications-patient.component.spec.ts
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
========
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
>>>>>>>> oussama/infermier:frontend/src/app/components/infermier/notifications/notifications.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
