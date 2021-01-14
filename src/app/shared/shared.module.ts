import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "../core.module";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    CommonModule,
    CoreModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }