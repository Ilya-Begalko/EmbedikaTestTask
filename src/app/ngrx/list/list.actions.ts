import { Action } from '@ngrx/store'

export enum listActionsType {
  getReposInit = '[LIST] getReposInit',
  getRepos = '[LIST] getRepos',
  getReposCurrentPage = '[LIST] getReposCurrentPage',
  pushReposCurrentPage = '[LIST] pushReposCurrentPage',
  pushRepos = '[LIST] pushRepos',
  saveLastQuery = '[LIST] saveLastQuery',
  showPreviousPage = '[LIST] showPreviousPage',
  showNextPage = '[LIST] showNextPage'
}

export class ListGetReposInitAction implements Action {
  readonly type = listActionsType.getReposInit
}

export class ListGetReposAction implements Action {
  readonly type = listActionsType.getRepos
  constructor(public query) { }
}


export class ListPushReposAction implements Action {
  readonly type = listActionsType.pushRepos
  constructor(public repos) { }
}

export class ListGetReposCurrentPageAction implements Action {
  readonly type = listActionsType.getReposCurrentPage
  constructor(
    public query,
    public currentPage
  ) { }
}

export class ListShowPreviousPage {
  readonly type = listActionsType.showPreviousPage
}

export class ListShowNextPage {
  readonly type = listActionsType.showNextPage
}

export class ListPushReposCurrentPageAction implements Action {
  readonly type = listActionsType.pushReposCurrentPage
  constructor(public repos) { }
}

export class SaveLastQueryAction implements Action {
  readonly type = listActionsType.saveLastQuery
  constructor(public lastQuery) { }
}

export type ListActions = ListGetReposInitAction
  | ListGetReposAction
  | ListPushReposAction
  | SaveLastQueryAction
  | ListPushReposCurrentPageAction
  | ListShowPreviousPage
  | ListShowNextPage
