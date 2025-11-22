import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesSimpsons } from './personajes-simpsons';

describe('PersonajesSimpsons', () => {
  let component: PersonajesSimpsons;
  let fixture: ComponentFixture<PersonajesSimpsons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajesSimpsons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesSimpsons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
