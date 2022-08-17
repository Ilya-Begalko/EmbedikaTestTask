import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'

import { selectRepoDetails } from '../../ngrx/item-card/item-card.selectors'
import { ItemCardState } from '../../ngrx/item-card/item-card.reducer'
import { ItemCardCloseCardAction } from '../../ngrx/item-card/item-card.actions'


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  constructor(
    public store$: Store<ItemCardState>
  ) { }

  public repoDetails: any
  public selectRepoDetails$ = this.store$.pipe(select(selectRepoDetails)).subscribe(repoDetails => {
    this.repoDetails = repoDetails
  })

  ngOnInit(): void {
  }
  closeCard() {
    this.store$.dispatch(new ItemCardCloseCardAction)
  }
}
