import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comphistorique } from './comphistorique';

describe('Comphistorique', () => {
  let component: Comphistorique;
  let fixture: ComponentFixture<Comphistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comphistorique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comphistorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
