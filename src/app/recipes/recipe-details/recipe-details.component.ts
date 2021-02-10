import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shoppin-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  ngUnsusbcribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.ngUnsusbcribe),
        map((params) => {
          this.id = +params['id'];
          return this.id;
        }),
        switchMap(() => {
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  ngOnDestroy() {
    this.ngUnsusbcribe.next(null);
    this.ngUnsusbcribe.complete();
  }

  sendIngredients() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipe.id - 1);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipe.id - 1));
    this.router.navigate(['/recipes']);
  }
}
