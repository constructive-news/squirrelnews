import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyDePage } from './privacy-de.page';

describe('PrivacyDePage', () => {
  let component: PrivacyDePage;
  let fixture: ComponentFixture<PrivacyDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
