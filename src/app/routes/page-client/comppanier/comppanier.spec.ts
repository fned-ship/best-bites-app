import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comppanier } from './comppanier';

describe('Comppanier', () => {
  let component: Comppanier;
  let fixture: ComponentFixture<Comppanier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comppanier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comppanier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
