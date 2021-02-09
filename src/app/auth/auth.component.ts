import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AuthResponseData, AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;

      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      authObs = this.authService.signup(email, password);
    }

    // authObs.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.errorMessage = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = errorMessage;

    componentRef.instance.close.pipe(take(1)).subscribe(() => {
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {}
}
