import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KfCheckInComponent } from './kf-check-in.component';

describe('KfCheckInComponent', () => {
  let component: KfCheckInComponent;
  let fixture: ComponentFixture<KfCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KfCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KfCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
