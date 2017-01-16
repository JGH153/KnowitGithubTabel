import { Component, OnInit } from '@angular/core';

import { GithubApiLoaderService } from './../github-api-loader.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


/*

Følgende api-kall lister noen av de mest populære javascript-repositoryene på Github:
https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100
(N.B. Vi ønsker ikke at du endrer på per_page parameteren. La den stå på per_page=100.)
Lag en nettside som presenterer repositoryene i en stylet tabell med minst 4 kolonner med informasjon om repositoryene.
Tabellen skal kun vise 20 repositoryer omgangen, men det skal være mulig å bla i gjennom alle repositoryene api kallet returnere ved hjelp av paginering.

*/

@Component({
  selector: 'app-github-table',
  templateUrl: './github-table.component.html',
  styleUrls: ['./github-table.component.css']
})
export class GithubTableComponent implements OnInit {

    githubData;
    githubDataLoaded = false;

    //first page is 0, first is 1
    pageNumber = 0;
    totalElements = 0;
    elementsPrPage = 20;
    elementsTotal = 100;

    constructor(
        private _GithubDataLoaderService: GithubApiLoaderService
    ) { }

    ngOnInit() {

        this._GithubDataLoaderService.loadData()
				.subscribe(
					data => {
                        this.onGithubDataLoaded(data);
					},
					error => console.error("_GithubDataLoaderService ERROR! ", error)
			);

    }

    onGithubDataLoaded(data){

        this.githubData = data.items;
        this.githubDataLoaded = true;

    }

    //limits down from githubData to what is only to be shown on the current page
    //could also do this with a filter
    getTableData():Array<any>{

        let returnSubArray = new Array();

        for(let i = 0; i < this.elementsPrPage; i ++){
            let index = i + (this.pageNumber * this.elementsPrPage);
            returnSubArray.push(this.githubData[index]);
        }

        return returnSubArray;

    }

    getElementOffset(){

        return this.pageNumber * this.elementsPrPage;

    }

    prevPage(){

        if(this.isPrevPage()){
            this.pageNumber --;
        }

    }

    isPrevPage(){

        if(this.pageNumber == 0){
            return false;
        }else{
            return true;
        }

    }

    isNextPage(){

        if((this.pageNumber + 1) * this.elementsPrPage >= this.elementsTotal){
            return false;
        }else{
            return true
        }

    }

    nextPage(){

        //console.log((this.pageNumber + 1) * this.elementsPrPage );
        if(this.isNextPage()){
            this.pageNumber ++;
        }


    }

}
