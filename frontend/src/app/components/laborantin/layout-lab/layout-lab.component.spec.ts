import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLabComponent } from './layout-lab.component';

describe('LayoutLabComponent', () => {
  let component: LayoutLabComponent;
  let fixture: ComponentFixture<LayoutLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
