import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsChangedSubscribtion: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    console.log('shopping-list init', this.ingredients);

    this.ingredientsChangedSubscribtion = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        console.log('shopping-list', ingredients);
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscribtion.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingListService.startingEditing.next(i);
  }
}
