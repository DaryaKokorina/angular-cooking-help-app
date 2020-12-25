import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  ngUnsusbcribe = new Subject();

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.ngUnsusbcribe)
    ).subscribe(params => this.recipe = this.recipeService.getRecipe(+params['id']));
  }

  ngOnDestroy() {
    this.ngUnsusbcribe.next(null);
    this.ngUnsusbcribe.complete();
  }

  sendIngredients() {
    this.slService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

}
