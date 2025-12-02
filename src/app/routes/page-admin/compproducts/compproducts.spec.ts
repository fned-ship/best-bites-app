import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compproducts } from './compproducts';

describe('Compproducts', () => {
  let component: Compproducts;
  let fixture: ComponentFixture<Compproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compproducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compproducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
