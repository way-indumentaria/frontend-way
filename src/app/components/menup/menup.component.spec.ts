import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupComponent } from './menup.component';

describe('MenupComponent', () => {
  let component: MenupComponent;
  let fixture: ComponentFixture<MenupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
