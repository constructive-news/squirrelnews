import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousPage } from './previous.page';

describe('PreviousPage', () => {
  let component: PreviousPage;
  let fixture: ComponentFixture<PreviousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
