import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoginComponent } from './company-login.component';

describe('CompanyLoginComponent', () => {
  let component: CompanyLoginComponent;
  let fixture: ComponentFixture<CompanyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
