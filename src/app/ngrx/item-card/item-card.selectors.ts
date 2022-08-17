import { createFeatureSelector, createSelector } from '@ngrx/store'

import { itemCardNode, ItemCardState } from './item-card.reducer'

export const selectItemCardFeature = createFeatureSelector<ItemCardState>(itemCardNode)

export const selectRepoDetails = createSelector(
  selectItemCardFeature,
  (state: ItemCardState): any => state.repoDetails
)
