import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImprintDePage } from './imprint-de.page';

describe('ImprintDePage', () => {
  let component: ImprintDePage;
  let fixture: ComponentFixture<ImprintDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprintDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
