import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.ngUnsusbcribe)
    ).subscribe(params => this.recipe = this.recipeService.getRecipe(+params['id']));

    console.log('recipe', this.slService.getIngredients());
  }

  ngOnDestroy() {
    this.ngUnsusbcribe.next(null);
    this.ngUnsusbcribe.complete();
  }

  sendIngredients() {
    this.slService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id - 1);
    this.router.navigate(['/recipes']);
  }

}
