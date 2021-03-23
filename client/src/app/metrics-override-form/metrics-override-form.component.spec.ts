import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsOverrideFormComponent } from './metrics-override-form.component';

describe('MetricsOverrideFormComponent', () => {
  let component: MetricsOverrideFormComponent;
  let fixture: ComponentFixture<MetricsOverrideFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsOverrideFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsOverrideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
