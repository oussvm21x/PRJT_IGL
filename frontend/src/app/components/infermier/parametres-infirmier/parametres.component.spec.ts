import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/src/app/components/patient/parametres-patient/parametres-patient.component.spec.ts
import { ParametrespatientComponent } from './parametres-patient.component';

describe('ParametresComponent', () => {
  let component: ParametrespatientComponent;
  let fixture: ComponentFixture<ParametrespatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrespatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrespatientComponent);
========
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
>>>>>>>> oussama/infermier:frontend/src/app/components/infermier/parametres/parametres.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
