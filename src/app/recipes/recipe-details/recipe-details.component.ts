import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  sendIngredients() {
    this.slService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

}
