import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanacesComponent } from './ordonnanaces.component';

describe('OrdonnanacesComponent', () => {
  let component: OrdonnanacesComponent;
  let fixture: ComponentFixture<OrdonnanacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnanacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
