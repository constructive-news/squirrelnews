import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutDePage } from './about-de.page';

describe('AboutDePage', () => {
  let component: AboutDePage;
  let fixture: ComponentFixture<AboutDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
