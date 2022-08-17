import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { listActionsType, ListPushReposAction, ListPushReposCurrentPageAction } from './ngrx/list/list.actions'
import { itemCardActionsType, ItemCardPushRepodDetailsAction } from './ngrx/item-card/item-card.actions'
import { map, switchMap } from 'rxjs/operators'
import { ListService } from './services/list.service'
import { ItemCardService } from './services/item-card.service'

@Injectable()

export class AppEffects {

  constructor(
    private actions$: Actions,
    private listService: ListService,
    private itemCardService: ItemCardService
  ) { }

  reposArrConstructor(repos) {
    class Repo {
      name: string
      size: number
      stargazers_count: number
      language: string
      url: string
      constructor(name: string, size: number, stargazers_count: number, language: string, url: string) {
        this.name = name
        this.size = size
        this.stargazers_count = stargazers_count
        this.language = language
        this.url = url
      }
    }
    return repos.items.map((repo, i) => {
      return new Repo(repo.name, repo.size, repo.stargazers_count, repo.language, repo.url)
    });
  }

  repoConstructor(repo) {
    class RepoDetails {
      name: string
      isPrivate: boolean
      watchers_count: number
      forks_count: number
      open_issues_count: number
      default_branch: string
      subscribers_count: number
      html_url: string
      constructor(
        name: string,
        isPrivate: boolean,
        watchers_count: number,
        forks_count: number,
        open_issues_count: number,
        default_branch: string,
        subscribers_count: number,
        html_url: string,
      ) {
        this.name = name
        this.isPrivate = isPrivate
        this.watchers_count = watchers_count
        this.forks_count = forks_count
        this.open_issues_count = open_issues_count
        this.default_branch = default_branch
        this.subscribers_count = subscribers_count
        this.html_url = html_url
      }

    }
    return new RepoDetails(
      repo.name,
      repo.private,
      repo.watchers_count,
      repo.forks_count,
      repo.open_issues_count,
      repo.default_branch,
      repo.subscribers_count,
      repo.html_url
    )
  }

  loadRepos$ = createEffect(() => this.actions$.pipe(
    ofType(
      listActionsType.getRepos,
      listActionsType.getReposInit,
    ),
    switchMap((action) => this.listService.getRepos(action)
      .pipe(
        map(repos => {
          let reposArr = this.reposArrConstructor(repos)
          return new ListPushReposAction(reposArr)
        })
      )
    )))

  nextPageLoadRepos$ = createEffect(() => this.actions$.pipe(
    ofType(
      listActionsType.getReposCurrentPage
    ),
    switchMap((action) => this.listService.getNextPageRepos(action)
      .pipe(
        map(repos => {
          let reposArr = this.reposArrConstructor(repos)
          return new ListPushReposCurrentPageAction(reposArr)
        })
      )
    )))

  loadRepoDetails$ = createEffect(() => this.actions$.pipe(
    ofType(
      itemCardActionsType.getRepoDetails
    ),
    switchMap((action) => this.itemCardService.getRepoDetails(action)
      .pipe(
        map(repo => {
          let repoDetails = this.repoConstructor(repo)
          return new ItemCardPushRepodDetailsAction(repoDetails)
        })
      )
    )))

}
