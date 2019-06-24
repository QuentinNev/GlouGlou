import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinestsPage } from './finests.page';

describe('FinestsPage', () => {
  let component: FinestsPage;
  let fixture: ComponentFixture<FinestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
