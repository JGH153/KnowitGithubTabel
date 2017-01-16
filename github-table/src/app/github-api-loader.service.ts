import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GithubApiLoaderService {

    constructor(
        private _http: Http
    ) { }

    loadData() : Observable<any>{

        return this._http.get('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100')
			.map(response => response.json());

    }


}
