import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { ListGetReposAction, ListGetReposInitAction } from '../../ngrx/list/list.actions'
import { ListState } from '../../ngrx/list/list.reducer'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor(
    public store$: Store<ListState>
  ) { }

  ngOnInit(): void {
  }


  query: any = {
    searchQueryString: '',
    languagesChecked: {
      python: false,
      javascript: false,
      java: false,
      php: false,
      assembly: false,
    },
    isMirror: false
  }

  isHidden: boolean = true

  languagesInputValue: any = ''

  setLanguagesInputValue() {
    let countLanguages: number = 0

    for (let language in this.query.languagesChecked) {
      this.query.languagesChecked[language] ? countLanguages++ : ''
    }

    if (countLanguages === 0) {
      this.languagesInputValue = ''
    }
    if (countLanguages === 1) {
      this.languagesInputValue = 'Выбран 1 язык'
    }
    if (countLanguages >= 2 && countLanguages <= 4) {
      this.languagesInputValue = `Выбрано ${countLanguages} языка`
    }
    if (countLanguages === 5) {
      this.languagesInputValue = 'Выбрано 5 языков'
    }
  }
  toggleHide() {
    this.isHidden = !this.isHidden
  }

  getRepos() {
    let query = { ...this.query }
    this.store$.dispatch(new ListGetReposAction(query));
  }

}
