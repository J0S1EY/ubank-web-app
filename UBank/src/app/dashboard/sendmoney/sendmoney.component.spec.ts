import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmoneyComponent } from './sendmoney.component';

describe('SendmoneyComponent', () => {
  let component: SendmoneyComponent;
  let fixture: ComponentFixture<SendmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendmoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
