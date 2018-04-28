import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingsComponent } from './outgoings.component';

describe('OutgoingsComponent', () => {
  let component: OutgoingsComponent;
  let fixture: ComponentFixture<OutgoingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
