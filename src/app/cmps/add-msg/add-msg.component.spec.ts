import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMsgComponent } from './add-msg.component';

describe('AddMsgComponent', () => {
  let component: AddMsgComponent;
  let fixture: ComponentFixture<AddMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
