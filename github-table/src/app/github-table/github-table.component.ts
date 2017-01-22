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

    title = 'Github API';

    githubData;
    githubDataSorted;
    githunDataFilterd;
    githubDataLoaded = false;

    sortByColumn = "name";
    sortAsc:boolean = true;
    sortByString = true;

    //first page is 0, first is 1
    pageNumber = 0;
    totalElements = 0;
    elementsPrPage = 20;
    elementsTotal = 0;
    elementsTotalFiltered = 0;

    selectedSubElement;
    subElementIsSelected = false;

    inputFilterValue = "";

    tableColums = [
        {"name": 'id', "isString": false},
        {"name": 'name', "isString": true},
        {"name": 'description', "isString": true},
        {"name": 'url', "isString": true},
        {"name": 'stargazers_count', "isString": false},
    ]

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

    //full reload of angular 2
    reload(){
        location.reload()
    }

    selectedTableRow(subObjectId):void{

        //look in unsorted array just in case.
        for(let i = 0; i < this.githubData.length; i ++){

            if(this.githubData[i].id == subObjectId){
                //assign object to variable
                this.selectedSubElement = this.githubData[i];
                this.subElementIsSelected = true;
                //no point in further searching
                return;
            }

        }

    }

    selectedSubElementCompleteEvent(event){

        if(event == true){

            this.subElementIsSelected = false;
            this.selectedSubElement = null;

        }

    }

    newFilterValue(newValue){
        this.inputFilterValue = newValue;
        this.filterArrayData();
        this.sortArrayData();
    }

    //executed when data is recived from github.
    onGithubDataLoaded(data){

        this.githubData = data.items;
        this.elementsTotal = this.githubData.length;
        //filter before sort (less to sort)
        this.filterArrayData();
        this.sortArrayData();
        this.githubDataLoaded = true;

    }

    filterArrayData(){

        let tempSubArray = new Array();

        for(let i = 0; i < this.githubData.length; i ++){

            if(this.inputFilterValue.length == 0 || this.githubData[i].name.includes(this.inputFilterValue)){
                tempSubArray.push(this.githubData[i]);
            }

        }

        //reteting to fist page. makes no sence to keep page number
        this.pageNumber = 0;

        //set elementsTotalFiltered for use in next page checking
        this.elementsTotalFiltered = tempSubArray.length;
        this.githunDataFilterd = tempSubArray.slice();

    }

    setSortByColumn(newColumnName, isString:boolean){

        //revert if same
        if(this.sortByColumn == newColumnName){
            this.sortAsc = !this.sortAsc;
        }else{
            this.sortByColumn = newColumnName;
            //reset to ASC on change
            this.sortAsc = true;
        }

        this.sortByString = isString;

        //reteting to fist page. makes no sence to keep page number
        this.pageNumber = 0;


        this.sortArrayData();

    }

    //sort array using the sort function. takes in filtered and stores in sorted
    sortArrayData(){

        let tempSubArray = this.githunDataFilterd.slice();
        tempSubArray.sort((a, b) => {

            //if string or number
            if(this.sortByString){
                return a[this.sortByColumn].localeCompare(b[this.sortByColumn]);
            }else{
                return a[this.sortByColumn] - b[this.sortByColumn];
            }


        });

        //reverse if desc
        if(!this.sortAsc){
            tempSubArray.reverse();
        }

        this.githubDataSorted = tempSubArray.slice();

    }

    //limits down from githubData to what is only to be shown on the current page
    //could also do this with a filter
    getTableData():Array<any>{

        if (!String.prototype.includes) {
            console.error("String.prototype.includes NOT supported ES6");
        }

        //this could be cached in some way in order to optimize and speedup execution
        let returnSubArray = new Array();

        for(let i = 0; i < this.elementsPrPage; i ++){
            let index = i + (this.pageNumber * this.elementsPrPage);

            //break out of loop if out of elements in githubData
            if(index >= this.githubDataSorted.length){
                break;
            }

            returnSubArray.push(this.githubDataSorted[index]);

        }


        return returnSubArray;

    }

    //used for index value in table. NOT IN USE FOR NOW
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

        if((this.pageNumber + 1) * this.elementsPrPage >= this.elementsTotalFiltered){
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

    //for css class. If current colum is the one sorted by and if sorting asc
    isSortingByAsc(columnName){
        return this.sortByColumn == columnName && this.sortAsc;
    }
    isSortingByDesc(columnName){
        return this.sortByColumn == columnName && !this.sortAsc;
    }


}
