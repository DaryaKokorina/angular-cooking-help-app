import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe;

  currentRecipeId: number;

  ngUnsubscribe = new Subject();

  constructor(
  ) { }

  ngOnInit(): void {    
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
