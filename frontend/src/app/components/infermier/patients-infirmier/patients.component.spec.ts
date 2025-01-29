import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/src/app/components/footer/footer.component.spec.ts
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
========
import { PatientsinfComponent } from './patients.component';

describe('PatientsComponent', () => {
  let component: PatientsinfComponent;
  let fixture: ComponentFixture<PatientsinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsinfComponent);
>>>>>>>> oussama/infermier:frontend/src/app/components/infermier/patients/patients.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
