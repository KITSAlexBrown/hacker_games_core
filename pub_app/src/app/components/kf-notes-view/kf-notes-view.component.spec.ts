import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KfNotesViewComponent } from './kf-notes-view.component';

describe('KfNotesViewComponent', () => {
  let component: KfNotesViewComponent;
  let fixture: ComponentFixture<KfNotesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KfNotesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KfNotesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
