import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChildPage } from './child.page';

describe('ChildPage', () => {
  let component: ChildPage;
  let fixture: ComponentFixture<ChildPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
