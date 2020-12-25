import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRecipeAlertComponent } from './select-recipe-alert.component';

describe('SelectRecipeAlertComponent', () => {
  let component: SelectRecipeAlertComponent;
  let fixture: ComponentFixture<SelectRecipeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRecipeAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRecipeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
