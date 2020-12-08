import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredient: EventEmitter<Ingredient>
    = new EventEmitter<Ingredient>();

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  addGood(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = Number(this.amountInputRef.nativeElement.value);
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.newIngredient.emit(newIngredient);
  }
}
