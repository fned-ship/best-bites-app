import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compmenu } from './compmenu';

describe('Compmenu', () => {
  let component: Compmenu;
  let fixture: ComponentFixture<Compmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
