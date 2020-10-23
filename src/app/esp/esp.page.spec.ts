import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspPage } from './esp.page';

describe('EspPage', () => {
  let component: EspPage;
  let fixture: ComponentFixture<EspPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EspPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
