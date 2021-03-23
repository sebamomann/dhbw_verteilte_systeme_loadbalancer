import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMetricsComponent } from './server-metrics.component';

describe('ServerMetricsComponent', () => {
  let component: ServerMetricsComponent;
  let fixture: ComponentFixture<ServerMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
