import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllPage } from './all.page';

describe('AllPage', () => {
  let component: AllPage;
  let fixture: ComponentFixture<AllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
