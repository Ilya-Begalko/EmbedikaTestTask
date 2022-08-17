import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service'
import { select, Store } from '@ngrx/store'
import { ListState } from '../../ngrx/list/list.reducer'
import { ListGetReposInitAction } from '../../ngrx/list/list.actions'
import { selectRepos, selectCurrentPage } from '../../ngrx/list/list.selectors'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public currentPage: number
  public selectCurrentPage$ = this.store$.pipe(select(selectCurrentPage)).subscribe(number => {
    this.currentPage = number - 1
    this.store$.pipe(select(selectRepos)).subscribe(repos => {
      this.repos = repos[this.currentPage]
    })

  })

  public repos: any = []
  public selectRepos$ = this.store$.pipe(select(selectRepos)).subscribe(repos => {
    this.repos = repos[this.currentPage]
  })

  constructor(
    public listService: ListService,
    public store$: Store<ListState>
  ) {
  }

  ngOnInit(): void {
    if (!this.repos) {
      this.store$.dispatch(new ListGetReposInitAction());
    }
  }

}
