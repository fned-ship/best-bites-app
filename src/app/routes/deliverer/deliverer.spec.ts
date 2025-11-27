import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deliverer } from './deliverer';

describe('Deliverer', () => {
  let component: Deliverer;
  let fixture: ComponentFixture<Deliverer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deliverer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deliverer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
