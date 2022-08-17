import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../../environments/environment'

import { listNode, ListState, listReducer } from './list/list.reducer'
import { itemCardNode, ItemCardState, itemCardReducer } from './item-card/item-card.reducer'


export interface State {
  [listNode]: ListState
  [itemCardNode]: ItemCardState
}
export const reducers: ActionReducerMap<State> = {
  [listNode]: listReducer,
  [itemCardNode]: itemCardReducer
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []
