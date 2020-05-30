import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImprintEnPage } from './imprint-en.page';

describe('ImprintEnPage', () => {
  let component: ImprintEnPage;
  let fixture: ComponentFixture<ImprintEnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprintEnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintEnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
