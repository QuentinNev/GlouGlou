import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBatchPage } from './new-batch.page';

describe('NewBatchPage', () => {
  let component: NewBatchPage;
  let fixture: ComponentFixture<NewBatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
