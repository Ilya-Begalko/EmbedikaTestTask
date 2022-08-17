import { ItemCardActions, itemCardActionsType } from './item-card.actions'

export const itemCardNode = 'itemCard'

export interface ItemCardState {
  repoDetails: any
}

const initialState: ItemCardState = {
  repoDetails: {}
}

export const itemCardReducer = (state = initialState, action: ItemCardActions) => {
  switch (action.type) {
    case itemCardActionsType.pushRepoDetails:
      return { ...state, repoDetails: action.repoDetails }
    case itemCardActionsType.closeCard:
      return { ...initialState }
    default:
      return { ...state };
  }
}
