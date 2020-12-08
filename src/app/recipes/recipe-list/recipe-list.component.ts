import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe', 
      'This is simpy a test recipe',
      'https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-horizontal-jpg-1522721531.jpg'),
      new Recipe(
        'A test Recipe 1', 
        'This is simpy a test recipe',
        'https://hips.hearstapps.com/hmg-prod/images/chicken-fajitas-horizontal-jpg-1522721531.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelectHandler(recipe: Recipe): void {
    this.selectedRecipe.emit(recipe);
  }

}
