import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel', 
      'Very tasty schnitzel - just awesome!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDt3-7wYWXkZWSQyOg85f3GB7oVXkZqwvTg&usqp=CAU', 
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]),
      new Recipe(
        2,
        'Big Fat Burger', 
        'Yammy!',
        'data:image/jpeg;base64,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', 
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1),
        ]),
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index-1] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}