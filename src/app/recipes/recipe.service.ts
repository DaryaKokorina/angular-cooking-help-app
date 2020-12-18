import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  public selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test Recipe', 
      'This is simpy a test recipe',
      'https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-horizontal-jpg-1522721531.jpg'),
      new Recipe(
        'A test Recipe 1', 
        'This is simpy a test recipe',
        'https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-horizontal-jpg-1522721531.jpg'),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}