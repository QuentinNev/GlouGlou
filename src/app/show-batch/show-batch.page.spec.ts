import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBatchPage } from './show-batch.page';

describe('ShowBatchPage', () => {
  let component: ShowBatchPage;
  let fixture: ComponentFixture<ShowBatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
