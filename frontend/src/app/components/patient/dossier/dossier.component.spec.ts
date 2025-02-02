import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierComponent } from './dossier.component';

describe('ModifierPatientComponent', () => {
  let component: DossierComponent;
  let fixture: ComponentFixture<DossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
