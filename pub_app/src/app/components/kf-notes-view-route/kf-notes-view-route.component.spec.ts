import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KfNotesViewRouteComponent } from './kf-notes-view-route.component';

describe('KfNotesViewComponent', () => {
  let component: KfNotesViewRouteComponent;
  let fixture: ComponentFixture<KfNotesViewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KfNotesViewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KfNotesViewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
