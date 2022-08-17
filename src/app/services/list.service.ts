import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'

import { SaveLastQueryAction } from '../ngrx/list/list.actions'
import { ListState } from '../ngrx/list/list.reducer'


@Injectable({ providedIn: 'root' })
export class ListService {

  constructor(
    private http: HttpClient,
    public store$: Store<ListState>
  ) { }

  getNextPageRepos(action) {
    let query = action.query.substring(0, action.query.length - 12) + action.currentPage.toString() + '&per_page=5'
    return this.http.get<any>(query)
  }

  getRepos(action): Observable<any> {
    if (!action.query) {
      if (action.currentPage) {
        return this.http.get<any>(`https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&page=${action.currentPage}&per_page=5`)
      }
      return this.http.get<any>('https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc&page=1&per_page=5')
    }

    let queryURL = 'https://api.github.com/search/repositories?q='

    if (action.query.searchQueryString) {
      queryURL += action.query.searchQueryString + '+'
    }

    for (let language in action.query.languagesChecked) {
      if (action.query.languagesChecked[language]) {
        queryURL += `language:${language}+`
      }
    }
    if (action.query.isMirror) {
      queryURL += 'mirror:true'
    }

    queryURL += '&sort=stars&order=desc&page=1&per_page=5'

    this.store$.dispatch(new SaveLastQueryAction(queryURL))

    return this.http.get<any>(queryURL)
  }
}
