import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  id: number;
  editMode = false;

  ngUnsusbcribe = new Subject();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.ngUnsusbcribe)
    ).subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
    });
  }

  ngOnDestroy(){
    this.ngUnsusbcribe.next(null);
    this.ngUnsusbcribe.complete();
  }

}
