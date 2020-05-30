import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutEnPage } from './about-en.page';

describe('AboutEnPage', () => {
  let component: AboutEnPage;
  let fixture: ComponentFixture<AboutEnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutEnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
