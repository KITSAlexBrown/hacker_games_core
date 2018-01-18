import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KfNoteInputComponent } from './kf-note-input.component';

describe('KfNoteInputComponent', () => {
  let component: KfNoteInputComponent;
  let fixture: ComponentFixture<KfNoteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KfNoteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KfNoteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
