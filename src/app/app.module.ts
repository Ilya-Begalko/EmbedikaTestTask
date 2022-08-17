import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { environment } from '../environments/environment';

import { ListComponent } from './components/list.component/list.component';
import { ListItemComponent } from './components/list-item.component/list-item.component';
import { FiltersComponent } from './components/filters.component/filters.component';
import { PaginationComponent } from './components/pagination.component/pagination.component';
import { ItemCardComponent } from './components/item-card.component/item-card.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from './ngrx';


const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'itemCard', component: ItemCardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    FiltersComponent,
    PaginationComponent,
    ItemCardComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
