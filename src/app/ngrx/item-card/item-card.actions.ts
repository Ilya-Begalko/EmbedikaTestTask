import { Action } from '@ngrx/store'

export enum itemCardActionsType {
  getRepoDetails = '[ITEM-CARD] getReposDetails',
  pushRepoDetails = '[ITEM-CARD] pushRepoDetails',
  closeCard = '[ITEM-CARD] closeCard'
}

export class ItemCardGetRepoDetailsAction implements Action {
  readonly type = itemCardActionsType.getRepoDetails
  constructor(public repoUrl) { }
}

export class ItemCardPushRepodDetailsAction implements Action {
  readonly type = itemCardActionsType.pushRepoDetails
  constructor(public repoDetails) { }
}

export class ItemCardCloseCardAction implements Action {
  readonly type = itemCardActionsType.closeCard
}

export type ItemCardActions = ItemCardGetRepoDetailsAction | ItemCardPushRepodDetailsAction | ItemCardCloseCardAction
