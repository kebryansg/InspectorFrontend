import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTabsComponent } from './card-tabs.component';

describe('CardTabsComponent', () => {
  let component: CardTabsComponent;
  let fixture: ComponentFixture<CardTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
