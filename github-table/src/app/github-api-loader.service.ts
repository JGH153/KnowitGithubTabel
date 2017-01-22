import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService }  from './local-storage.service';

@Injectable()
export class GithubApiLoaderService {

    constructor(
        private _http: Http
    ) { }

    loadData() : Observable<any>{
        //max retrive count for API is 100 per page
        return this._http.get('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100')
			.map(response => response.json());

    }


}
