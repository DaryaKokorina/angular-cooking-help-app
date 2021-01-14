import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editedItemIndex: number;
  editMode: boolean;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startingEditing.subscribe((index: number) => {
      setTimeout(() => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
    });
  }

  addOrUpdateItem(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode ?
      this.slService.updateIngredient(this.editedItemIndex, newIngredient) :
      this.slService.addIngredient(newIngredient);

    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }
}
