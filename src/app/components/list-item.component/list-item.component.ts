import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store'

import { ItemCardState } from '../../ngrx/item-card/item-card.reducer'
import { ItemCardGetRepoDetailsAction } from '../../ngrx/item-card/item-card.actions'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() repo

  constructor(
    public store$: Store<ItemCardState>
  ) { }

  ngOnInit(): void {
  }

  showCard() {
    this.store$.dispatch(new ItemCardGetRepoDetailsAction(this.repo.url))
  }
}
