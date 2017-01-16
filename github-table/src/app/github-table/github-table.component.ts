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
    elementsTotal = 0;

    constructor(
        private _GithubDataLoaderService: GithubApiLoaderService
    ) { }

    ngOnInit() {

        //subscribe to service on componend load.
        this._GithubDataLoaderService.loadData()
				.subscribe(
					data => {
                        this.onGithubDataLoaded(data);
					},
					error => console.error("_GithubDataLoaderService ERROR! ", error)
			);

    }

    //executed when data is recived from github.
    onGithubDataLoaded(data){

        this.githubData = data.items;
        this.elementsTotal = this.githubData.length;
        this.githubDataLoaded = true;

    }

    //limits down from githubData to what is only to be shown on the current page
    //could also do this with a filter
    getTableData():Array<any>{

        //this could be cached in some way in order to optimize and speedup execution
        let returnSubArray = new Array();

        for(let i = 0; i < this.elementsPrPage; i ++){
            let index = i + (this.pageNumber * this.elementsPrPage);

            //break out of loop if out of elements in githubData
            if(index >= this.githubData.length){
                break;
            }
            returnSubArray.push(this.githubData[index]);
        }

        return returnSubArray;

    }

    //used for index value in table.
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

    //determines if there is a next page by checking if advancing to the next page still leaves at least one more element
    isNextPage(){

        if((this.pageNumber + 1) * this.elementsPrPage >= this.elementsTotal){
            return false;
        }else{
            return true
        }

    }

    nextPage(){

        if(this.isNextPage()){
            this.pageNumber ++;
        }


    }

}
