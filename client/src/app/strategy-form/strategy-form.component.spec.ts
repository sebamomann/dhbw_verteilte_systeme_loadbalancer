import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyFormComponent } from './strategy-form.component';

describe('StrategyFormComponent', () => {
  let component: StrategyFormComponent;
  let fixture: ComponentFixture<StrategyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
