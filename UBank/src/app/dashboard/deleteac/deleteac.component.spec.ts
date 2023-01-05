import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteacComponent } from './deleteac.component';

describe('DeleteacComponent', () => {
  let component: DeleteacComponent;
  let fixture: ComponentFixture<DeleteacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
