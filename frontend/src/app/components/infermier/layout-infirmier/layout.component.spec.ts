import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutinfComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutinfComponent;
  let fixture: ComponentFixture<LayoutinfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutinfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
