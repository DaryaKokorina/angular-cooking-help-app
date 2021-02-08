import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shoppin-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editedItemIndex: number;
  editMode: boolean;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItemIndex = stateData.editedIngredientIndex;
          this.editedItem = stateData.editedIngredient;

          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });

    // this.subscription = this.slService.startingEditing.subscribe(
    //   (ingredientData) => {
    //     setTimeout(() => {
    //       this.editedItemIndex = ingredientData.index;
    //       this.editMode = true;
    //       this.editedItem = ingredientData.ingredient;
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount,
    //       });
    //     });
    //   }
    // );
  }

  addOrUpdateItem(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode
      ? this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        )
      : this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
        );

    form.reset();
    this.editMode = false;
  }

  onClear(): void {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
