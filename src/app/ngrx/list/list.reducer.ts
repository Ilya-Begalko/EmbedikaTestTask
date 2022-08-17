import { ListActions, listActionsType } from './list.actions'

export const listNode = 'list'

export interface ListState {
  repos: any[],
  currentPage: number,
  lastQuery: string
}

const initialState: ListState = {
  repos: [],
  currentPage: 1,
  lastQuery: 'https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&page=1&per_page=3'
}

export const listReducer = (state = initialState, action: ListActions) => {
  switch (action.type) {
    case listActionsType.pushRepos:
      let firstPageRepos = []
      firstPageRepos.push(action.repos)
      return { ...state, repos: firstPageRepos, currentPage: 1 }
    case listActionsType.pushReposCurrentPage:
      let currentPageRepos = [...state.repos]
      currentPageRepos.push(action.repos)
      return { ...state, repos: currentPageRepos, currentPage: state.currentPage + 1 }
    case listActionsType.saveLastQuery:
      return { ...state, lastQuery: action.lastQuery }
    case listActionsType.showPreviousPage:
      return { ...state, currentPage: state.currentPage - 1 }
    case listActionsType.showNextPage:
      return { ...state, currentPage: state.currentPage + 1 }
    default:
      return state
  }
}
