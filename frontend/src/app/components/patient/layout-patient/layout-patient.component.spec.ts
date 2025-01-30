import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutpatientComponent } from './layout-patient.component';

describe('LayoutComponent', () => {
  let component: LayoutpatientComponent;
  let fixture: ComponentFixture<LayoutpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
