import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compstock } from './compstock';

describe('Compstock', () => {
  let component: Compstock;
  let fixture: ComponentFixture<Compstock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compstock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compstock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
