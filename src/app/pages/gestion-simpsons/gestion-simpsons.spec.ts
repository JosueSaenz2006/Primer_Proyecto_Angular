import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSimpsons } from './gestion-simpsons';

describe('GestionSimpsons', () => {
  let component: GestionSimpsons;
  let fixture: ComponentFixture<GestionSimpsons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSimpsons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSimpsons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
